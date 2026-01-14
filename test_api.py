#!/usr/bin/env python3
import requests
import json
import time

# Wait for server to be ready
time.sleep(3)

BASE_URL = "http://localhost:5000"

print("\n🧪 Testing API Endpoints\n")

endpoints = [
    ("/api/health", "Health Check"),
    ("/api/global-universities?limit=3", "Global Universities (first 3)"),
    ("/api/global-universities/regions", "List Regions"),
]

for endpoint, description in endpoints:
    try:
        print(f"Testing: {description}")
        print(f"  Endpoint: GET {endpoint}")
        response = requests.get(f"{BASE_URL}{endpoint}", timeout=10)
        print(f"  ✅ Status: {response.status_code}")
        
        data = response.json()
        if endpoint == "/api/health":
            print(f"  Response: {data['status']}")
        elif "global-universities" in endpoint and "regions" not in endpoint:
            print(f"  Total: {data.get('total')} universities")
            if 'universities' in data:
                for uni in data['universities'][:2]:
                    print(f"    • {uni['name']} ({uni['country']})")
        elif "regions" in endpoint:
            print(f"  Regions: {[r['name'] for r in data.get('regions', [])]}")
        print()
    except requests.exceptions.Timeout:
        print(f"  ❌ Timeout\n")
    except Exception as e:
        print(f"  ❌ Error: {e}\n")

print("✅ Testing complete!")
