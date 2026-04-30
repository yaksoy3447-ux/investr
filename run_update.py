import json
from data_tr import posts_all_tr

# Fixed high-quality English content for the 10 most recent posts
posts_all_en = [
 {
    "title": "Wayve Achieves $8.6B Valuation with $60M Series D Extension",
    "content": "London-based autonomous driving startup Wayve has added a $60 million extension to its Series D, bringing the total round to $1.2 billion and its valuation to a staggering $8.6 billion. Backed by chip giants AMD, Arm, and Qualcomm, Wayve is pioneering 'Embodied AI'—a single deep learning model that allows vehicles to learn driving strategies like humans, rather than following rigid code.\n\nThe involvement of semiconductor leaders suggests that Wayve's software will be deeply optimized for next-generation industrial silicon. This hardware-software synergy is critical for reducing processing latency in real-time autonomous decisions. Wayve's model of licensing its OS to automotive manufacturers reduces the risks of hardware manufacturing, positioning it as a pure AI innovation leader in the MobilityTech sector.",
    "author": "GetInvestr Research",
    "date": "April 15, 2026",
    "readMinutes": 10,
    "image": "/blog/wayve_ai_main.png",
    "secondaryImages": [
        "/blog/wayve_ai_1.png", "/blog/wayve_ai_2.png", "/blog/wayve_ai_3.png", "/blog/wayve_ai_4.png"
    ],
    "category": "Automotive Technology"
 },
 {
    "title": "Bluefish Closes $43M Series B: The Era of Agentic AI Marketing",
    "content": "Bluefish has raised $43 million in Series B funding, led by Threshold Ventures and NEA, to usher in the era of 'Agentic AI' in marketing. Unlike traditional tools, Bluefish deploys autonomous agents that understand financial goals and execute end-to-end marketing strategies—from creative generation to A/B testing and budget reallocation—without human intervention.\n\nThe investment demonstrates market confidence in software that can directly drive revenue. As customer acquisition costs (CAC) rise, Bluefish's real-time micro-optimization provides a critical advantage for brands. The capital will be used to adapt their agent infrastructure for autonomous SEO and expand their enterprise partnerships across Europe and Asia.",
    "author": "GetInvestr Research",
    "date": "April 14, 2026",
    "readMinutes": 8,
    "image": "/blog/bluefish_ai_main.png",
    "secondaryImages": [
        "/blog/bluefish_ai_1.png", "/blog/bluefish_ai_2.png", "/blog/bluefish_ai_3.png", "/blog/bluefish_ai_4.png"
    ],
    "category": "Marketing Technology"
 },
 {
    "title": "Atlas Rockets to $420M Valuation with $40M for Premium Fintech",
    "content": "Targeting the affluent 'VIP' segment, Atlas has secured $40 million at a $420 million valuation in a round led by Elad Gil and Verified Capital. Atlas offers more than just a digital wallet; it is a lifestyle concierge for high-net-worth individuals, providing exclusive lounge access, Michelin-starred reservations, and a premium metal card, all driven by a personalized AI assistant.\n\nBy focusing on a niche with high Customer Lifetime Value (LTV), Atlas avoids the high-CAC, low-margin trap of traditional neo-banks. This referral-driven organic growth model creates a loyal, closed-network ecosystem. The new funding will be used to enhance their 'Concierge AI' algorithm and integrate secure Web3 assets into the spending experience.",
    "author": "GetInvestr Research",
    "date": "April 14, 2026",
    "readMinutes": 9,
    "image": "/blog/atlas_fintech_main.png",
    "secondaryImages": [
        "/blog/atlas_fintech_1.png", "/blog/atlas_fintech_2.png", "/blog/atlas_fintech_3.png", "/blog/atlas_fintech_4.png"
    ],
    "category": "Financial Technology (Fintech)"
 },
 {
    "title": "Pillar Secures $20 Million Seed Led by a16z for Risk Management AI",
    "content": "Pillar has raised a record-shattering $20 million Seed round, led by Andreessen Horowitz (a16z), to solve the fragmented operational risk management crisis for banks and large corporations. Pillar uses a cloud-based AI engine to integrate real-time global banking data with macroeconomic indicators, allowing C-level executives to simulate risk scenarios and market shocks instantly.\n\nThis massive seed-stage investment signals the urgent need for 'RiskTech' in an era of volatile interest rates and shifting regulations. Pillar acts as a cost-mitigating alternative to traditional audit agencies, providing stable, recurring revenue potential for its investors. The capital will be used to scale their B2B API integrations and hire top-tier AI and cloud security researchers.",
    "author": "GetInvestr Research",
    "date": "April 15, 2026",
    "readMinutes": 9,
    "image": "/blog/pillar_risk_main.png",
    "secondaryImages": [
        "/blog/pillar_risk_1.png", "/blog/pillar_risk_2.png", "/blog/pillar_risk_3.png", "/blog/pillar_risk_4.png"
    ],
    "category": "Risk Management & Fintech"
 },
 {
    "title": "Ratio Secures $15.8M Equity and $100M Lending Facility",
    "content": "B2B fintech Ratio has announced a dual financing milestone: $15.8 million in venture capital equity and a colossal $100 million institutional lending facility. Ratio's AI engine bypasses traditional credit bureaus by analyzing transactional data via APIs, providing instant credit approvals for the 'Buy Now, Pay Later' (BNPL) B2B market.\n\nThe $100 million lending capacity is a testament to the stability of Ratio's risk algorithms. By embedding credit possibilities directly into SaaS and e-commerce interfaces, Ratio unblocks commercial bottlenecks and generates high-margin revenue through interest yields. The equity portion will fuel their B2B go-to-market strategy and expand their proprietary 'Data Lake' capabilities.",
    "author": "GetInvestr Research",
    "date": "April 14, 2026",
    "readMinutes": 8,
    "image": "/blog/ratio_fintech_main.png",
    "secondaryImages": [
        "/blog/ratio_fintech_1.png", "/blog/ratio_fintech_2.png", "/blog/ratio_fintech_3.png", "/blog/ratio_fintech_4.png"
    ],
    "category": "Financial Technology (Fintech)"
 },
 {
    "title": "Ranger AI Collects $6M Seed to Automate Corporate Workflows with Agents",
    "content": "Ranger AI has secured $6 million in Seed funding to lead the 'Agentic AI' revolution for corporate operations. Their agents go beyond chat assistance, autonomously handling complex workflows like syncing billing dates with ERP systems and managing approval sequences from email data. This reduces white-collar operational overhead and increases efficiency exponentially.\n\nThe investment validates the potential for B2B AI agents to secure massive SaaS monopolies. By minimizing employee overhead through frictionless API logic, Ranger AI delivers significant profit margins. The roadmap includes fortifying cloud security protocols and expanding their sales partnership model into the American and European markets.",
    "author": "GetInvestr Research",
    "date": "April 14, 2026",
    "readMinutes": 8,
    "image": "/blog/ranger_ai_main.png",
    "secondaryImages": [
        "/blog/ranger_ai_1.png", "/blog/ranger_ai_2.png", "/blog/ranger_ai_3.png", "/blog/ranger_ai_4.png"
    ],
    "category": "Artificial Intelligence (AI)"
 },
 {
    "title": "Gelu AI Raises $2M Seed to Optimize Machine Learning Infrastructure",
    "content": "Gelu AI has secured $2 million in Seed funding to tackle the massive efficiency losses in GPU-heavy machine learning workflows. While the market focuses on large models, Gelu AI builds the backend infrastructure that prevents thermal throttling and minimizes computing waste. Their platform allows developers to train models faster and at a much lower cost.\n\nThis seed investment is a validation of 'Efficiency-as-a-Service' in the AI stack. By optimizing low-level protocols, Gelu AI provides a critical advantage to enterprises running large-scale computations. The funds will be used to expand their team of data engineers and AI researchers to further refine their autonomous optimization engine.",
    "author": "GetInvestr Research",
    "date": "April 15, 2026",
    "readMinutes": 8,
    "image": "/blog/gelu_ai_main.png",
    "secondaryImages": [
        "/blog/gelu_ai_1.png", "/blog/gelu_ai_2.png", "/blog/gelu_ai_3.png", "/blog/gelu_ai_4.png"
    ],
    "category": "Machine Learning (ML)"
 },
 {
    "title": "Hack Your Biology With Timeshifter Earning $1.8 Million Through Skip Capital Ecosystems",
    "content": "Timeshifter has raised $1.8 million, led by Skip Capital, to help global professionals and athletes manage their biological clocks through personalized circadian rhythm optimization. The platform uses scientific data to advise users on sleep, sunlight, and caffeine intake based on their flight schedules and individual chronotypes.\n\nThis investment in 'HealthTech' highlights the growing demand for bio-hacking tools in the high-performance segment. Timeshifter's B2B potential—licensing to aviation fleets and professional sports teams—provides a scalable revenue path. The funding will be used to integrate their platform with enterprise reservation systems and expand their medical cloud infrastructure.",
    "author": "GetInvestr Research",
    "date": "April 15, 2026",
    "readMinutes": 8,
    "image": "/blog/timeshifter_main.png",
    "secondaryImages": [
        "/blog/timeshifter_1.png", "/blog/timeshifter_2.png", "/blog/timeshifter_3.png", "/blog/timeshifter_4.png"
    ],
    "category": "Health Technology (HealthTech)"
 },
 {
    "title": "Record Breaking VC Funds: Accel Secures $5 Billion Aggressively Targeting Late-Stage Artificial Intelligence",
    "content": "Venture capital giant Accel has confirmed an aggressive $5 billion fund specifically aimed at late-stage artificial intelligence and cloud infrastructure companies. This massive capital pool, which includes a $4 billion 'Leaders Fund' and a $650 million 'Sidecar Fund', signals a consolidation in the AI market toward established winners with proven scalability.\n\nAccel's move demonstrates that AI is transitioning from a hype cycle into a fundamental utility for global business. By targeting mega-deals, Accel aims to capture significant equity in the companies that will define the next decade of technology. This re-allocation of capital away from early-stage 'spray and pray' models toward late-stage titans is a major trend in the 2026 VC landscape.",
    "author": "GetInvestr Research",
    "date": "April 15, 2026",
    "readMinutes": 10,
    "image": "/blog/accel_vc_main.png",
    "secondaryImages": [
        "/blog/accel_vc_1.png", "/blog/accel_vc_2.png", "/blog/accel_vc_3.png", "/blog/accel_vc_4.png"
    ],
    "category": "Venture Capital Funds (VC)"
 },
 {
    "title": "Lockheed Martin Magnifies Corporate VC Capabilities Surging to a $1 Billion Target",
    "content": "Aerospace giant Lockheed Martin has increased its Corporate Venture Capital (CVC) fund target by 250%, reaching a resounding $1 billion. This initiative aims to bridge the gap between nimble silicon valley startups and traditional defense R&D, focusing on 'Dual-Use' technologies like autonomous drones and cybersecurity that can serve both military and commercial markets.\n\nThe fund allows Lockheed Martin to acquire innovative technologies rapidly, bypassing the hantal bureaucratic processes of government defense contracting. By investing in early-stage 'Vision Recognition' and 'Edge AI' startups, Lockheed secures its defense technology pipeline for the future. This strategic shift confirms the increasing importance of startup agility in modern national security.",
    "author": "GetInvestr Research",
    "date": "April 15, 2026",
    "readMinutes": 10,
    "image": "/blog/lockheed_vc_main.png",
    "secondaryImages": [
        "/blog/lockheed_vc_1.png", "/blog/lockheed_vc_2.png", "/blog/lockheed_vc_3.png", "/blog/lockheed_vc_4.png"
    ],
    "category": "Defense Technology"
 }
]

def merge_and_update(file_path_tr, file_path_en):
    with open(file_path_tr, 'r', encoding='utf-8') as f:
        data_tr = json.load(f)
    with open(file_path_en, 'r', encoding='utf-8') as f:
        data_en = json.load(f)

    # TR json (includes all 10)
    posts_db_tr = data_tr['landing']['blog']['posts']
    max_id_tr = max([p['id'] for p in posts_db_tr]) if len(posts_db_tr) > 0 else 0
    for p in reversed(posts_all_tr):
        # Only add if not already there (based on title)
        if not any(post['title'] == p['title'] for post in posts_db_tr):
            max_id_tr += 1
            p['id'] = max_id_tr
            posts_db_tr.insert(0, p)
    
    with open(file_path_tr, 'w', encoding='utf-8') as f:
        json.dump(data_tr, f, ensure_ascii=False, indent=2)

    # EN json (includes all 10)
    posts_db_en = data_en['landing']['blog']['posts']
    max_id_en = max([p['id'] for p in posts_db_en]) if len(posts_db_en) > 0 else 0
    for p in reversed(posts_all_en):
        if not any(post['title'] == p['title'] for post in posts_db_en):
            max_id_en += 1
            p['id'] = max_id_en
            posts_db_en.insert(0, p)
            
    with open(file_path_en, 'w', encoding='utf-8') as f:
        json.dump(data_en, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    merge_and_update('i18n/messages/tr.json', 'i18n/messages/en.json')
    print("JSON databases successfully updated for both languages.")
