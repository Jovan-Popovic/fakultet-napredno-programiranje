import csv
import os
import random
import re
import time

from playwright.sync_api import sync_playwright


class EstitorScraper:

    def __init__(self):
        self.base_url = "https://estitor.com"

        self.gradovi = {
            "Tivat": "grad-tivat",
            "Podgorica": "grad-podgorica",
            "Budva": "grad-budva",
            "Bar": "grad-bar",
            "Nikšić": "grad-niksic",
            "Herceg Novi": "grad-herceg-novi",
            "Kotor": "grad-kotor",
            "Danilovgrad": "grad-danilovgrad",
            "Kolašin": "grad-kolasin",
            "Cetinje": "grad-cetinje",
            "Žabljak": "grad-zabljak",
            "Ulcinj": "grad-ulcinj",
            "Bjelo Polje": "grad-bijelo-polje",
            "Plužine": "grad-pluzine",
            "Berane": "grad-berane",
        }

        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.csv_file = os.path.join(base_dir, "estitor_backup.csv")

        self.results = []
        self.seen_links = set()

    def human_sleep(self, min_s=1.5, max_s=4.0):
        time.sleep(random.uniform(min_s, max_s))

    def parse_title(self, title):
        if not title:
            return None, None, None, None

        area_match = re.search(r"(\d+)\s?m²", title)
        area = f"{area_match.group(1)} m²" if area_match else None

        title_lower = title.lower()

        if "stan" in title_lower:
            property_type = "Stan"
        elif "kuća" in title_lower:
            property_type = "Kuća"
        elif "garsonjera" in title_lower:
            property_type = "Garsonjera"
        elif "poslovni prostor" in title_lower:
            property_type = "Poslovni prostor"
        else:
            property_type = None

        rooms_map = {
            "jednosoban": "1",
            "dvosoban": "2",
            "trosoban": "3",
            "četvorosoban": "4",
        }

        rooms = None
        for key, value in rooms_map.items():
            if key in title_lower:
                rooms = value
                break

        location = title.split(",")[-1].strip()
        return area, rooms, property_type, location

    def scroll_page(self, page, scrolls=6):
        for _ in range(scrolls):
            page.mouse.wheel(0, 2500)
            self.human_sleep(1.5, 3)

    def save_to_csv(self):
        if not self.results:
            return

        with open(self.csv_file, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=self.results[0].keys())
            writer.writeheader()
            writer.writerows(self.results)

    def scrape(self):
        try:
            with sync_playwright() as p:
                browser = p.chromium.launch(headless=False)
                page = browser.new_page()

                for grad, slug in self.gradovi.items():
                    print(f"\n GRAD: {grad}")
                    page_num = 1

                    while True:
                        url = f"{self.base_url}/me/nekretnine/namjena-prodaja/{slug}"
                        if page_num > 1:
                            url += f"/strana-{page_num}"

                        print(f" {grad} – Stranica {page_num}")
                        page.goto(url, timeout=60000)

                        try:
                            page.wait_for_selector("article", timeout=10000)
                        except:
                            print("Nema vise oglasa.")
                            break

                        self.human_sleep(2, 4)
                        self.scroll_page(page)

                        listings = page.query_selector_all("article")
                        if not listings:
                            break

                        for listing in listings:
                            try:
                                title_el = listing.query_selector("h3")
                                title = (
                                    title_el.inner_text().strip() if title_el else None
                                )

                                price_el = listing.query_selector("[class*=price]")
                                price = (
                                    price_el.inner_text().strip() if price_el else None
                                )

                                link_el = listing.query_selector("a")
                                href = (
                                    link_el.get_attribute("href") if link_el else None
                                )
                                if not href:
                                    continue

                                link = (
                                    self.base_url + href
                                    if not href.startswith("http")
                                    else href
                                )
                                if link in self.seen_links:
                                    continue
                                self.seen_links.add(link)

                                area, rooms, prop_type, location = self.parse_title(
                                    title
                                )

                                self.results.append(
                                    {
                                        "grad": grad,
                                        "naslov": title,
                                        "cijena": price,
                                        "kvadratura": area,
                                        "broj_soba": rooms,
                                        "tip": prop_type,
                                        "lokacija": location,
                                        "link": link,
                                    }
                                )

                            except:
                                continue

                        # auto cuvanje
                        self.save_to_csv()
                        print(f" CSV snimljen, ukupno oglasa: {len(self.results)}")

                        page_num += 1
                        self.human_sleep(3, 6)

                browser.close()

        except KeyboardInterrupt:
            print("\nPrekinuto")
            self.save_to_csv()

        return self.results


class RealiticaScraper:

    BASE_URL = (
        "https://www.realitica.com/index.php?"
        "for=Prodaja&pZpa=Crna+Gora&pState=Crna+Gora"
        "&type%5B%5D=&price-min=&price-max="
        "&since-day=p-anytime&qob=p-default&qry=&lng=hr"
    )

    CSV_FILE = "RealiticaOglasi.csv"

    GRADOVI = {
        "Andrijevica": "Andrijevica",
        "Bar": "Bar",
        "Berane": "Berane",
        "Bijelo Polje": "Bijelo Polje",
        "Budva": "Budva",
        "Budva okolina": "Budva Okolina",
        "Cetinje": "Cetinje",
        "Danilovgrad": "Danilovgrad",
        "Herceg Novi": "Herceg Novi",
        "Kolašin": "Kolašin",
        "Kotor": "Kotor",
        "Mojkovac": "Mojkovac",
        "Nikšić": "Nikšić",
        "Plav": "Plav",
        "Plužine": "Plužine",
        "Pljevlja": "Pljevlja",
        "Podgorica": "Podgorica",
        "Podgorica okolina": "Podgorica Okolina",
        "Rožaje": "Rožaje",
        "Šavnik": "Šavnik",
        "Tivat": "Tivat",
        "Ulcinj": "Ulcinj",
        "Žabljak": "Žabljak",
    }

    def __init__(self):
        self.results = []
        self.seen_links = set()

    def parse_listing(self, div, grad):
        text = div.inner_text()

        # LINK
        link = ""
        for i in range(div.locator("a").count()):
            href = div.locator("a").nth(i).get_attribute("href")
            if href and "listing" in href:
                link = href
                break

        if not link:
            return None

        # NASLOV
        naslov = ""
        strongs = div.locator("strong")
        for i in range(strongs.count()):
            t = strongs.nth(i).inner_text().strip().lower()
            if "prodaje" in t:
                naslov = strongs.nth(i).inner_text().strip()
                break

        if not naslov:
            return None

        # CIJENA
        cijena = ""
        m = re.search(r"€[\d\.,]+", text)
        if m:
            cijena = m.group(0)

        # KVADRATURA
        kvadratura = ""
        m = re.search(r"(\d+)\s*m", text)
        if m:
            kvadratura = m.group(1)

        # BROJ SOBA
        broj_soba = ""
        m = re.search(r"(\d+)\s*sobe", text)
        if m:
            broj_soba = m.group(1)

        # LOKACIJA (OSTAJE ORIGINALNA)
        lokacija = ""
        m = re.search(r".+?,.+?,\s*Crna Gora", text)
        if m:
            lokacija = m.group(0)

        # TIP
        tl = naslov.lower()
        if "stan" in tl:
            tip = "Stan"
        elif "kuća" in tl:
            tip = "Kuća"
        elif "zemljište" in tl or "plac" in tl:
            tip = "Zemljište"
        else:
            tip = ""

        return {
            "grad": grad,
            "naslov": naslov,
            "cijena": cijena,
            "kvadratura": kvadratura,
            "broj_soba": broj_soba,
            "tip": tip,
            "lokacija": lokacija,
            "link": link,
        }

    def save_csv(self):
        if not self.results:
            print(" Nema podataka za snimanje.")
            return

        with open(self.CSV_FILE, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(
                f,
                fieldnames=[
                    "grad",
                    "naslov",
                    "cijena",
                    "kvadratura",
                    "broj_soba",
                    "tip",
                    "lokacija",
                    "link",
                ],
            )
            writer.writeheader()
            writer.writerows(self.results)

        print(f"\n CSV snimljen ({len(self.results)} oglasa): {self.CSV_FILE}")

    def scrape(self):
        try:
            with sync_playwright() as p:
                browser = p.chromium.launch(headless=False)
                page = browser.new_page()

                for grad, slug in self.GRADOVI.items():
                    print(f"\n GRAD: {grad}")
                    page_num = 1

                    while True:
                        if page_num == 1:
                            url = self.BASE_URL + f"&opa%5B%5D={slug}"
                        else:
                            url = (
                                self.BASE_URL + f"&opa%5B%5D={slug}&cur_page={page_num}"
                            )

                        print(f"{grad} – Stranica {page_num}")
                        page.goto(url, timeout=60000)
                        page.wait_for_timeout(4000)

                        listings = page.locator('div:has(a[href*="listing"])')
                        if listings.count() == 0:
                            break

                        new_items = 0
                        for i in range(listings.count()):
                            div = listings.nth(i)
                            data = self.parse_listing(div, grad)
                            if not data:
                                continue

                            if data["link"] in self.seen_links:
                                continue

                            self.seen_links.add(data["link"])
                            self.results.append(data)
                            new_items += 1
                            print(data["naslov"])

                        if new_items == 0:
                            break

                        page_num += 1

                browser.close()

        except KeyboardInterrupt:
            print("\n Prekinuto ručno (Ctrl + C)")

        finally:
            self.save_csv()


if __name__ == "__main__":

    # scraper = EstitorScraper()
    # data = scraper.scrape()
    # print(f"\n Ukupno predjenih oglasa: {len(data)}")
    scraper = RealiticaScraper()
    scraper.scrape()
