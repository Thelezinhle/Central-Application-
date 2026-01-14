#!/usr/bin/env python3
import http.client
import json

print("\n🧪 Testing API Endpoints\n")

try:
    conn = http.client.HTTPConnection('127.0.0.1', 5000, timeout=5)
    
    # Test 1: Health
    print("Test 1: GET /api/health")
    conn.request('GET', '/api/health')
    response = conn.getresponse()
    data = response.read().decode()
    print(f"  Status: {response.status}")
    print(f"  Response: {data}")
    conn.close()
    
except Exception as e:
    print(f"❌ Error: {e}")

print("\n✅ Testing complete!")
