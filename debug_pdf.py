"""
Debug script to see PDF content structure
"""
import pdfplumber

pdf_path = "CAO_Handbook_2026_Entry.pdf"

print("Opening PDF to inspect structure...\n")

with pdfplumber.open(pdf_path) as pdf:
    print(f"Total pages: {len(pdf.pages)}\n")
    
    # Check pages 45-50 to see structure
    for page_num in range(44, min(51, len(pdf.pages))):
        page = pdf.pages[page_num]
        print(f"\n{'='*60}")
        print(f"PAGE {page_num + 1}")
        print(f"{'='*60}")
        
        # Try to extract tables
        try:
            tables = page.extract_tables()
            if tables:
                print(f"Tables found: {len(tables)}")
                for i, table in enumerate(tables):
                    print(f"\nTable {i + 1}:")
                    for j, row in enumerate(table[:3]):  # Show first 3 rows
                        print(f"  Row {j}: {row}")
        except Exception as e:
            print(f"Table extraction error: {e}")
        
        # Extract text
        text = page.extract_text()
        if text:
            lines = text.split('\n')
            print(f"\nText extraction (first 20 lines):")
            for i, line in enumerate(lines[:20]):
                if line.strip():
                    print(f"  {line[:100]}")
