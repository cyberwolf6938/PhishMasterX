import requests

def get_ip_info(ip):
    try:
        response = requests.get(f"https://ipapi.co/{ip}/json/")
        data = response.json()

        location_data = {
            "ip": ip,
            "city": data.get("city"),
            "region": data.get("region"),
            "country": data.get("country_name"),
            "org": data.get("org"),
            "timezone": data.get("timezone"),
        }

        return location_data

    except Exception as e:
        return {"error": str(e)}
