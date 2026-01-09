#!/usr/bin/env python3
"""
CAO Handbook 2026 Data Extraction
Extracts programme codes and names from CAO Handbook PDF
Uses table extraction (pages 49-260) and text extraction as fallback
"""

import pdfplumber
import pandas as pd
import json
import re
import os
from pathlib import Path

# Configuration
PDF_PATH = "CAO_Handbook_2026_Entry.pdf"
OUTPUT_JSON = "cao_programmes.json"
OUTPUT_CSV = "cao_programmes.csv"

def process_line(line):
    """
    Extract programme code and name from text line
    Fallback for text-based extraction
    """
    line = line.strip()
    if not line or len(line) < 5:
        return None
    
    # Try multiple patterns for different code formats
    patterns = [
        r'^([A-Z]{2,}\-[A-Z0-9\-]+)\s+(.+)$',  # ZU-M-BAS Something
        r'^([A-Z]{2,}\d{2,}[A-Z]?)\s+(.+)$',   # BCMM101 Name
        r'^([A-Z]{3,}\d{3,})\s+(.+)$',          # BCOM101 Name
        r'^([A-Z]+\d+)\s+(.+)$',                # BEN101 Name
    ]
    
    for pattern in patterns:
        match = re.match(pattern, line)
        if match:
            code = match.group(1).strip()
            name = match.group(2).strip()
            # Validate extracted data
            if len(code) >= 3 and len(name) >= 3:
                return code, name
    
    return None


def process_pdf(pdf_path):
    """Process PDF and extract programme data from tables"""
    programmes = []
    
    if not os.path.exists(pdf_path):
        print(f"ERROR: PDF file not found at {pdf_path}")
        return programmes
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            total_pages = len(pdf.pages)
            print(f"Total pages in PDF: {total_pages}")
            print("Extracting from pages 49-260 (table-based handbook)...\n")
            
            # Pages 49-260 contain the handbook tables with programme data (0-indexed: 48-259)
            start_page = 48  
            end_page = min(260, total_pages)
            
            current_category = None
            current_institution = None
            
            for page_idx in range(start_page, end_page):
                page = pdf.pages[page_idx]
                
                # Extract tables first (primary source of data)
                tables = page.extract_tables()
                
                if tables:
                    for table in tables:
                        for row_idx, row in enumerate(table):
                            if not row or len(row) == 0:
                                continue
                            
                            first_cell = str(row[0]).strip() if row[0] else ""
                            
                            # Detect category rows (e.g., "1. ACCOUNTING, FINANCIAL MANAGEMENT")
                            if re.match(r'^\d+\.\s+[A-Z]', first_cell):
                                current_category = first_cell
                                continue
                            
                            # Detect institution headers
                            if 'UNIVERSITIES' in first_cell.upper() or 'COLLEGE' in first_cell.upper():
                                current_institution = first_cell
                                continue
                            
                            # Skip rows with headers or section markers
                            if any(x in first_cell.lower() for x in ['programme name', 'code', 'closing', 'minimum', 'entry', 'notes']):
                                continue
                            
                            # Extract programme: format is [name, code, date, points, requirements, ...]
                            if len(row) >= 2:
                                prog_name = str(row[0]).strip() if row[0] else ""
                                prog_code = str(row[1]).strip() if row[1] else ""
                                
                                # Validate and extract code
                                if prog_name and prog_code and len(prog_name) >= 3 and len(prog_code) >= 2:
                                    # Programme code format: "ZU-M-BAS" or similar
                                    code_match = re.match(r'^([A-Z]{2,}[A-Z0-9\-]+)', prog_code)
                                    if code_match:
                                        code = code_match.group(1).strip()
                                        programmes.append({
                                            'code': code,
                                            'name': prog_name,
                                            'category': current_category or 'Uncategorized',
                                            'institution': current_institution or 'Unknown',
                                            'page': page_idx + 1
                                        })
                
                # Fallback: extract from text if no tables found
                else:
                    text = page.extract_text()
                    if text:
                        lines = text.split('\n')
                        for line in lines:
                            line = line.strip()
                            if line and len(line) > 5:
                                extracted = process_line(line)
                                if extracted:
                                    code, name = extracted
                                    programmes.append({
                                        'code': code,
                                        'name': name,
                                        'category': current_category or 'Uncategorized',
                                        'institution': current_institution or 'Unknown',
                                        'page': page_idx + 1
                                    })
                
                # Progress indicator
                progress = page_idx - start_page + 1
                if progress % 20 == 0 or progress == 1:
                    print(f"  Processed {progress} pages... Found {len(programmes)} programmes so far")
            
            print(f"\nCompleted extraction: {len(programmes)} programmes found")
            
    except Exception as e:
        print(f"ERROR processing PDF: {e}")
        import traceback
        traceback.print_exc()
    
    return programmes


def save_data(programmes):
    """Save extracted data to JSON and CSV"""
    if not programmes:
        print("No data to save. Extraction returned 0 programmes.")
        return False
    
    try:
        # Save to JSON
        with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
            json.dump(programmes, f, indent=2, ensure_ascii=False)
        print(f"\n✓ Saved {len(programmes)} programmes to {OUTPUT_JSON}")
        
        # Save to CSV
        df = pd.DataFrame(programmes)
        df.to_csv(OUTPUT_CSV, index=False, encoding='utf-8')
        print(f"✓ Saved {len(programmes)} programmes to {OUTPUT_CSV}")
        
        # Print summary statistics
        print(f"\nSummary Statistics:")
        print(f"  Total programmes: {len(programmes)}")
        if 'category' in df.columns:
            print(f"  Categories: {df['category'].nunique()}")
            print(f"  Top 5 categories:")
            for cat, count in df['category'].value_counts().head().items():
                print(f"    - {cat}: {count}")
        
        return True
        
    except Exception as e:
        print(f"Error saving data: {e}")
        return False


def main():
    """Main execution"""
    print("=" * 60)
    print("CAO Handbook 2026 Programme Extraction")
    print("=" * 60)
    print()
    
    # Check if PDF exists
    if not os.path.exists(PDF_PATH):
        print(f"ERROR: {PDF_PATH} not found in current directory")
        print(f"Current directory: {os.getcwd()}")
        return
    
    print(f"Using PDF: {PDF_PATH}")
    print(f"File size: {os.path.getsize(PDF_PATH) / (1024*1024):.1f} MB\n")
    
    # Process PDF
    programmes = process_pdf(PDF_PATH)
    
    # Save results
    if programmes:
        save_data(programmes)
        print("\n✓ Extraction complete and data saved!")
    else:
        print("\n✗ Extraction returned 0 results. Check PDF structure.")


if __name__ == "__main__":
    main()
