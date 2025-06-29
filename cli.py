from core.cloner import start_cloner

site_map = {
    "1": "facebook",
    "2": "instagram",
    "3": "gmail"
}

sub_choice = input("Select option (1/2/3): ")
start_cloner(site_map[sub_choice])
