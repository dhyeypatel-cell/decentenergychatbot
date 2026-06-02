// All FAQ entries extracted and structured for RAG ingestion
// Each chunk has a unique ID, the Q&A text, and metadata for filtering

export interface FAQChunk {
  id: string;
  text: string; // "Q: ... A: ..." — what gets embedded
  metadata: {
    category: string;   // top-level grouping
    product: string;    // "general" | "shifter" | "flexer" | "decentenergy" | "trade"
    question: string;
    answer: string;
  };
}

export const FAQ_CHUNKS: FAQChunk[] = [
  // ─── GENERAL ENERGY FLEXIBILITY ───────────────────────────────────────────
  {
    id: "gen-001",
    text: "Q: What is energy flexibility trading? A: Shifting or adjusting energy production and consumption patterns in real time based on market price signals or grid requests.",
    metadata: { category: "General Concepts", product: "general", question: "What is energy flexibility trading?", answer: "Shifting or adjusting energy production and consumption patterns in real time based on market price signals or grid requests." }
  },
  {
    id: "gen-002",
    text: "Q: Why is flexibility needed now? A: The rise of volatile renewable sources like wind and solar requires dynamic demand management to keep the grid stable.",
    metadata: { category: "General Concepts", product: "general", question: "Why is flexibility needed now?", answer: "The rise of volatile renewable sources like wind and solar requires dynamic demand management to keep the grid stable." }
  },
  {
    id: "gen-003",
    text: "Q: What is the difference between implicit and explicit flexibility? A: Implicit flexibility is manually responding to variable price tariffs, while explicit flexibility is a committed, automated resource traded directly on wholesale or balancing markets.",
    metadata: { category: "General Concepts", product: "general", question: "What is the difference between implicit and explicit flexibility?", answer: "Implicit flexibility is manually responding to variable price tariffs, while explicit flexibility is a committed, automated resource traded directly on wholesale or balancing markets." }
  },
  {
    id: "gen-004",
    text: "Q: Who can participate in flexibility trading? A: Industrial facilities, commercial buildings, electric vehicle fleet managers, and owners of battery energy storage systems (BESS).",
    metadata: { category: "General Concepts", product: "general", question: "Who can participate in flexibility trading?", answer: "Industrial facilities, commercial buildings, electric vehicle fleet managers, and owners of battery energy storage systems (BESS)." }
  },
  {
    id: "gen-005",
    text: "Q: How do you connect to our local assets? A: We use secure APIs and smart IoT hardware to link your hardware directly to our automated dispatch platform.",
    metadata: { category: "Technology & Integration", product: "general", question: "How do you connect to our local assets?", answer: "We use secure APIs and smart IoT hardware to link your hardware directly to our automated dispatch platform." }
  },
  {
    id: "gen-006",
    text: "Q: Will trading disrupt our daily business operations? A: No, we build a digital twin to simulate asset boundaries and define strict constraints, ensuring your core processes run smoothly.",
    metadata: { category: "Technology & Integration", product: "general", question: "Will trading disrupt our daily business operations?", answer: "No, we build a digital twin to simulate asset boundaries and define strict constraints, ensuring your core processes run smoothly." }
  },
  {
    id: "gen-007",
    text: "Q: What hardware or software must we install? A: We provide proprietary smart controllers that integrate seamlessly with your existing Building Management System (BMS) or asset controls.",
    metadata: { category: "Technology & Integration", product: "general", question: "What hardware or software must we install?", answer: "We provide proprietary smart controllers that integrate seamlessly with your existing Building Management System (BMS) or asset controls." }
  },
  {
    id: "gen-008",
    text: "Q: Is our corporate data safe and secure? A: We use enterprise-grade encryption and secure VPN tunnels to protect all operational data and communication.",
    metadata: { category: "Technology & Integration", product: "general", question: "Is our corporate data safe and secure?", answer: "We use enterprise-grade encryption and secure VPN tunnels to protect all operational data and communication." }
  },
  {
    id: "gen-009",
    text: "Q: How do assets generate revenue through trading? A: Assets earn money by capturing price spreads on the intraday spot market or by receiving availability and utilisation fees in ancillary service markets.",
    metadata: { category: "Financials & Revenue", product: "general", question: "How do assets generate revenue through trading?", answer: "Assets earn money by capturing price spreads on the intraday spot market or by receiving availability and utilisation fees in ancillary service markets." }
  },
  {
    id: "gen-010",
    text: "Q: What are availability fees versus utilisation fees? A: Availability fees pay you for standing ready to respond, while utilisation fees pay for the actual energy delivered during an activation.",
    metadata: { category: "Financials & Revenue", product: "general", question: "What are availability fees versus utilisation fees?", answer: "Availability fees pay you for standing ready to respond, while utilisation fees pay for the actual energy delivered during an activation." }
  },
  {
    id: "gen-011",
    text: "Q: Can we stack multiple revenue streams? A: Yes, our AI optimization engine allows assets to stack revenues by bidding into wholesale, capacity, and balancing markets simultaneously.",
    metadata: { category: "Financials & Revenue", product: "general", question: "Can we stack multiple revenue streams?", answer: "Yes, our AI optimization engine allows assets to stack revenues by bidding into wholesale, capacity, and balancing markets simultaneously." }
  },
  {
    id: "gen-012",
    text: "Q: How and when do we receive financial payouts? A: Financial statements are calculated monthly, showing market earnings minus our agreed platform management fee.",
    metadata: { category: "Financials & Revenue", product: "general", question: "How and when do we receive financial payouts?", answer: "Financial statements are calculated monthly, showing market earnings minus our agreed platform management fee." }
  },
  {
    id: "gen-013",
    text: "Q: Which energy markets do you trade on? A: We trade across Day-Ahead, Intraday, and local balancing/ancillary service markets.",
    metadata: { category: "Market & Operations", product: "general", question: "Which energy markets do you trade on?", answer: "We trade across Day-Ahead, Intraday, and local balancing/ancillary service markets." }
  },
  {
    id: "gen-014",
    text: "Q: How fast must our assets respond to a signal? A: Response times depend on the program, ranging from a few minutes for standard services down to fractions of a second for fast frequency response.",
    metadata: { category: "Market & Operations", product: "general", question: "How fast must our assets respond to a signal?", answer: "Response times depend on the program, ranging from a few minutes for standard services down to fractions of a second for fast frequency response." }
  },
  {
    id: "gen-015",
    text: "Q: What happens if our asset fails to respond to an event? A: Automated fallback protocols activate instantly; built-in portfolio aggregation buffers protect individual asset owners from penalties.",
    metadata: { category: "Market & Operations", product: "general", question: "What happens if our asset fails to respond to an event?", answer: "Automated fallback protocols activate instantly; built-in portfolio aggregation buffers protect individual asset owners from penalties." }
  },
  {
    id: "gen-016",
    text: "Q: Who handles market registration and compliance paperwork? A: We manage the entire regulatory onboarding process, including EIC registration, KYC validation, and REMIT compliance reporting.",
    metadata: { category: "Market & Operations", product: "general", question: "Who handles market registration and compliance paperwork?", answer: "We manage the entire regulatory onboarding process, including EIC registration, KYC validation, and REMIT compliance reporting." }
  },

  // ─── TRADE-SPECIFIC ────────────────────────────────────────────────────────
  {
    id: "trade-001",
    text: "Q: Which precise power markets do you interface with? A: We trade directly on European spot exchanges like EPEX SPOT and Nord Pool, as well as local Transmission System Operator (TSO) ancillary markets.",
    metadata: { category: "Market Access & Mechanics", product: "trade", question: "Which precise power markets do you interface with?", answer: "We trade directly on European spot exchanges like EPEX SPOT and Nord Pool, as well as local Transmission System Operator (TSO) ancillary markets." }
  },
  {
    id: "trade-002",
    text: "Q: What specific ancillary services can our assets target? A: We trade assets across Frequency Containment Reserves (FCR), automatic Frequency Restoration Reserves (aFRR), and manual Frequency Restoration Reserves (mFRR).",
    metadata: { category: "Market Access & Mechanics", product: "trade", question: "What specific ancillary services can our assets target?", answer: "We trade assets across Frequency Containment Reserves (FCR), automatic Frequency Restoration Reserves (aFRR), and manual Frequency Restoration Reserves (mFRR)." }
  },
  {
    id: "trade-003",
    text: "Q: Do you trade on the Over-the-Counter (OTC) market? A: Yes, we execute both exchange-cleared trades and bilateral OTC forward contracts to hedge long-term price risks for large asset portfolios.",
    metadata: { category: "Market Access & Mechanics", product: "trade", question: "Do you trade on the Over-the-Counter (OTC) market?", answer: "Yes, we execute both exchange-cleared trades and bilateral OTC forward contracts to hedge long-term price risks for large asset portfolios." }
  },
  {
    id: "trade-004",
    text: "Q: How do you handle cross-border flexibility trading? A: We optimize bids across interconnected market zones by monitoring cross-zonal capacities and explicit allocation constraints.",
    metadata: { category: "Market Access & Mechanics", product: "trade", question: "How do you handle cross-border flexibility trading?", answer: "We optimize bids across interconnected market zones by monitoring cross-zonal capacities and explicit allocation constraints." }
  },
  {
    id: "trade-005",
    text: "Q: How are trading decisions made for our assets? A: Our proprietary algorithmic trading engine uses machine learning to process weather data, grid load forecasts, and historical price patterns to submit automated bids.",
    metadata: { category: "Execution & Algorithmic Trading", product: "trade", question: "How are trading decisions made for our assets?", answer: "Our proprietary algorithmic trading engine uses machine learning to process weather data, grid load forecasts, and historical price patterns to submit automated bids." }
  },
  {
    id: "trade-006",
    text: "Q: What is the latency of your trading platform? A: Our cloud-native infrastructure features sub-millisecond internal execution processing, matching TSO telemetry and fast frequency response timelines.",
    metadata: { category: "Execution & Algorithmic Trading", product: "trade", question: "What is the latency of your trading platform?", answer: "Our cloud-native infrastructure features sub-millisecond internal execution processing, matching TSO telemetry and fast frequency response timelines." }
  },
  {
    id: "trade-007",
    text: "Q: How does your platform prevent algorithmic trading errors? A: We implement automated pre-trade risk controls, hard execution limits, and instant kill-switch protocols to prevent erroneous market orders.",
    metadata: { category: "Execution & Algorithmic Trading", product: "trade", question: "How does your platform prevent algorithmic trading errors?", answer: "We implement automated pre-trade risk controls, hard execution limits, and instant kill-switch protocols to prevent erroneous market orders." }
  },
  {
    id: "trade-008",
    text: "Q: Can we set a minimum strike price for our asset dispatch? A: Yes, you define operational marginal costs and activation price floors within our platform portal.",
    metadata: { category: "Execution & Algorithmic Trading", product: "trade", question: "Can we set a minimum strike price for our asset dispatch?", answer: "Yes, you define operational marginal costs and activation price floors within our platform portal." }
  },
  {
    id: "trade-009",
    text: "Q: Who bears the financial risk of imbalance penalties? A: As the Balance Responsible Party (BRP) or through strict contractual agreements, we assume the balancing risk and shield your asset from market penalties.",
    metadata: { category: "Risk, Boundaries & Compliance", product: "trade", question: "Who bears the financial risk of imbalance penalties?", answer: "As the Balance Responsible Party (BRP) or through strict contractual agreements, we assume the balancing risk and shield your asset from market penalties." }
  },
  {
    id: "trade-010",
    text: "Q: How do you manage the State of Charge (SoC) for battery assets? A: Our algorithms continuously monitor battery SoC boundaries to ensure assets maintain enough capacity to fulfill market commitments without accelerating degradation.",
    metadata: { category: "Risk, Boundaries & Compliance", product: "trade", question: "How do you manage the State of Charge (SoC) for battery assets?", answer: "Our algorithms continuously monitor battery SoC boundaries to ensure assets maintain enough capacity to fulfill market commitments without accelerating degradation." }
  },
  {
    id: "trade-011",
    text: "Q: How does the platform handle physical delivery shortfalls? A: If an asset fails to respond, our portfolio management system instantly triggers dynamic substitution, routing the obligation to other aggregated assets in our pool.",
    metadata: { category: "Risk, Boundaries & Compliance", product: "trade", question: "How does the platform handle physical delivery shortfalls?", answer: "If an asset fails to respond, our portfolio management system instantly triggers dynamic substitution, routing the obligation to other aggregated assets in our pool." }
  },
  {
    id: "trade-012",
    text: "Q: Are your trading practices fully REMIT compliant? A: Yes, all market transactions and orders are automatically logged, timestamped, and reported to ACER in strict compliance with REMIT regulations.",
    metadata: { category: "Risk, Boundaries & Compliance", product: "trade", question: "Are your trading practices fully REMIT compliant?", answer: "Yes, all market transactions and orders are automatically logged, timestamped, and reported to ACER in strict compliance with REMIT regulations." }
  },
  {
    id: "trade-013",
    text: "Q: How is the baseline calculated to prove asset delivery? A: We use TSO-approved baseline methodologies, comparing actual metered output against historical consumption profiles during the exact settlement period.",
    metadata: { category: "Settlement & Financial Clearing", product: "trade", question: "How is the baseline calculated to prove asset delivery?", answer: "We use TSO-approved baseline methodologies, comparing actual metered output against historical consumption profiles during the exact settlement period." }
  },
  {
    id: "trade-014",
    text: "Q: What data resolution is required for trade financial settlement? A: Settlement relies on high-resolution smart meter telemetry, typically captured at 15-minute intervals for spot markets or 1-second intervals for frequency markets.",
    metadata: { category: "Settlement & Financial Clearing", product: "trade", question: "What data resolution is required for trade financial settlement?", answer: "Settlement relies on high-resolution smart meter telemetry, typically captured at 15-minute intervals for spot markets or 1-second intervals for frequency markets." }
  },
  {
    id: "trade-015",
    text: "Q: How do negative power prices affect our trading revenue? A: We capitalize on negative prices by automatically bidding your consumption assets to turn on (getting paid to consume) or shutting down generation assets to avoid costs.",
    metadata: { category: "Settlement & Financial Clearing", product: "trade", question: "How do negative power prices affect our trading revenue?", answer: "We capitalize on negative prices by automatically bidding your consumption assets to turn on (getting paid to consume) or shutting down generation assets to avoid costs." }
  },
  {
    id: "trade-016",
    text: "Q: Do you provide real-time financial tracking? A: Yes, our client dashboard delivers a live view of executed trades, projected monthly revenues, and real-time market performance data.",
    metadata: { category: "Settlement & Financial Clearing", product: "trade", question: "Do you provide real-time financial tracking?", answer: "Yes, our client dashboard delivers a live view of executed trades, projected monthly revenues, and real-time market performance data." }
  },

  // ─── DECENT ENERGY ────────────────────────────────────────────────────────
  {
    id: "de-001",
    text: "Q: Do I need to buy or install any extra hardware? A: No, the platform operates entirely as a software solution with no hardware, no site visits, and no hassle.",
    metadata: { category: "Onboarding & Requirements", product: "decentenergy", question: "Do I need to buy or install any extra hardware?", answer: "No, the platform operates entirely as a software solution with no hardware, no site visits, and no hassle." }
  },
  {
    id: "de-002",
    text: "Q: Which energy assets are compatible with the platform? A: The software directly integrates with your existing smart low-carbon technology, including Solar Inverters, EV Chargers, and Heat Pumps.",
    metadata: { category: "Onboarding & Requirements", product: "decentenergy", question: "Which energy assets are compatible with the platform?", answer: "The software directly integrates with your existing smart low-carbon technology, including Solar Inverters, EV Chargers, and Heat Pumps." }
  },
  {
    id: "de-003",
    text: "Q: Why do you require 13 months of smart meter data? A: The maximum data retrieval period is 13 months. Analyzing a full 13-month period accounts for seasonal variations to accurately map your baseline consumption pattern.",
    metadata: { category: "Onboarding & Requirements", product: "decentenergy", question: "Why do you require 13 months of smart meter data?", answer: "The maximum data retrieval period is 13 months. Analyzing a full 13-month period accounts for seasonal variations to accurately map your baseline consumption pattern." }
  },
  {
    id: "de-004",
    text: "Q: What types of energy tariffs work best with your service? A: The software optimizes across multiple structures, but it delivers maximum savings when paired with a Time-of-use tariff or a dynamic Agile tariff where prices change every 30 minutes.",
    metadata: { category: "Onboarding & Requirements", product: "decentenergy", question: "What types of energy tariffs work best with your service?", answer: "The software optimizes across multiple structures, but it delivers maximum savings when paired with a Time-of-use tariff or a dynamic Agile tariff where prices change every 30 minutes." }
  },
  {
    id: "de-005",
    text: "Q: How does the platform automatically reduce my bills and carbon footprint? A: The algorithms continuously process hundreds of daily data points—including weather forecasts and real-time grid carbon intensity—to generate optimal charging and discharging schedules.",
    metadata: { category: "Automation & Optimization", product: "decentenergy", question: "How does the platform automatically reduce my bills and carbon footprint?", answer: "The algorithms continuously process hundreds of daily data points—including weather forecasts and real-time grid carbon intensity—to generate optimal charging and discharging schedules." }
  },
  {
    id: "de-006",
    text: "Q: How much money and carbon can I expect to save? A: The automated system is proven to save customers up to 25% on their energy bills while simultaneously reducing carbon intensity by 15% or more.",
    metadata: { category: "Automation & Optimization", product: "decentenergy", question: "How much money and carbon can I expect to save?", answer: "The automated system is proven to save customers up to 25% on their energy bills while simultaneously reducing carbon intensity by 15% or more." }
  },
  {
    id: "de-007",
    text: "Q: Will the optimization override my personal comfort or EV needs? A: No, the smart automation works seamlessly within your pre-set preferences, ensuring your home stays warm and your vehicle is fully charged exactly when you need it.",
    metadata: { category: "Automation & Optimization", product: "decentenergy", question: "Will the optimization override my personal comfort or EV needs?", answer: "No, the smart automation works seamlessly within your pre-set preferences, ensuring your home stays warm and your vehicle is fully charged exactly when you need it." }
  },
  {
    id: "de-008",
    text: "Q: How do you protect my battery from premature degradation? A: The charging schedules prioritize battery health by operating strictly within original manufacturer tolerances and safety thresholds.",
    metadata: { category: "Automation & Optimization", product: "decentenergy", question: "How do you protect my battery from premature degradation?", answer: "The charging schedules prioritize battery health by operating strictly within original manufacturer tolerances and safety thresholds." }
  },
  {
    id: "de-009",
    text: "Q: How do homes and small businesses participate in flexibility trading? A: By aggregating thousands of smaller, decentralized consumer assets into a Virtual Power Plant (VPP), the software enables small-scale users to collectively trade on grid flexibility markets.",
    metadata: { category: "Virtual Power Plants & Grid Services", product: "decentenergy", question: "How do homes and small businesses participate in flexibility trading?", answer: "By aggregating thousands of smaller, decentralized consumer assets into a Virtual Power Plant (VPP), the software enables small-scale users to collectively trade on grid flexibility markets." }
  },
  {
    id: "de-010",
    text: "Q: What is the primary mission of your flexibility network? A: The goal is to provide everyone access to energy at the lowest possible cost, maximize the utilization of green energy, and accelerate the decarbonisation of grid demand.",
    metadata: { category: "Virtual Power Plants & Grid Services", product: "decentenergy", question: "What is the primary mission of your flexibility network?", answer: "The goal is to provide everyone access to energy at the lowest possible cost, maximize the utilization of green energy, and accelerate the decarbonisation of grid demand." }
  },
  {
    id: "de-011",
    text: "Q: How do we support the regional electricity grid operator? A: When the grid experiences peak demand stresses, the software automatically shifts asset usage away from peak times to maintain network stability.",
    metadata: { category: "Virtual Power Plants & Grid Services", product: "decentenergy", question: "How do we support the regional electricity grid operator?", answer: "When the grid experiences peak demand stresses, the software automatically shifts asset usage away from peak times to maintain network stability." }
  },
  {
    id: "de-012",
    text: "Q: Are you an independent provider or affiliated with an energy supplier? A: The platform maintains total independence and transparency, operating strictly on behalf of the customer rather than the energy corporations.",
    metadata: { category: "Virtual Power Plants & Grid Services", product: "decentenergy", question: "Are you an independent provider or affiliated with an energy supplier?", answer: "The platform maintains total independence and transparency, operating strictly on behalf of the customer rather than the energy corporations." }
  },

  // ─── SHIFTER ─────────────────────────────────────────────────────────────
  {
    id: "shif-001",
    text: "Q: What exactly is Shîfter? A: It is an intelligent software app that manages home energy storage by automatically shifting your electricity usage to times of day when energy is cheaper and cleaner.",
    metadata: { category: "Product Overview & Setup", product: "shifter", question: "What exactly is Shîfter?", answer: "It is an intelligent software app that manages home energy storage by automatically shifting your electricity usage to times of day when energy is cheaper and cleaner." }
  },
  {
    id: "shif-002",
    text: "Q: How fast can I get Shîfter up and running? A: If you have a compatible inverter and a time-of-use tariff, the entire digital onboarding takes as little as 10 minutes to complete.",
    metadata: { category: "Product Overview & Setup", product: "shifter", question: "How fast can I get Shîfter up and running?", answer: "If you have a compatible inverter and a time-of-use tariff, the entire digital onboarding takes as little as 10 minutes to complete." }
  },
  {
    id: "shif-003",
    text: "Q: Do I need to replace my existing home energy setup? A: No, the software works alongside your current household components, requiring no additional physical hardware or control boxes to be installed.",
    metadata: { category: "Product Overview & Setup", product: "shifter", question: "Do I need to replace my existing home energy setup?", answer: "No, the software works alongside your current household components, requiring no additional physical hardware or control boxes to be installed." }
  },
  {
    id: "shif-004",
    text: "Q: How does the Forecasting step analyze my home? A: The software extracts historical energy data to build a custom AI-driven forecasting model that accurately maps out your household's unique consumption patterns.",
    metadata: { category: "How the Algorithm Works", product: "shifter", question: "How does the Forecasting step analyze my home?", answer: "The software extracts historical energy data to build a custom AI-driven forecasting model that accurately maps out your household's unique consumption patterns." }
  },
  {
    id: "shif-005",
    text: "Q: How does the Optimization engine reduce costs? A: The system automates your home battery charging schedules to buy electricity during rock-bottom price periods while prioritizing low-carbon energy locally.",
    metadata: { category: "How the Algorithm Works", product: "shifter", question: "How does the Optimization engine reduce costs?", answer: "The system automates your home battery charging schedules to buy electricity during rock-bottom price periods while prioritizing low-carbon energy locally." }
  },
  {
    id: "shif-006",
    text: "Q: How does the Integration process link with my hardware? A: The platform connects directly to your home inverter via cloud APIs, ensuring a completely seamless, automated execution.",
    metadata: { category: "How the Algorithm Works", product: "shifter", question: "How does the Integration process link with my hardware?", answer: "The platform connects directly to your home inverter via cloud APIs, ensuring a completely seamless, automated execution." }
  },
  {
    id: "shif-007",
    text: "Q: What is the typical savings rate for a Shîfter user? A: Live data and simulations show an average electricity bill savings of 25% for standard users.",
    metadata: { category: "Financial Savings & Subscription Model", product: "shifter", question: "What is the typical savings rate for a Shîfter user?", answer: "Live data and simulations show an average electricity bill savings of 25% for standard users." }
  },
  {
    id: "shif-008",
    text: "Q: What if I have an electric heat system or variable load? A: Data indicates partial electric heat users can achieve up to 35% savings, while partial load shifters see an average of 18% savings.",
    metadata: { category: "Financial Savings & Subscription Model", product: "shifter", question: "What if I have an electric heat system or variable load?", answer: "Data indicates partial electric heat users can achieve up to 35% savings, while partial load shifters see an average of 18% savings." }
  },
  {
    id: "shif-009",
    text: "Q: How does the payment and fee structure work? A: The app runs on a success-oriented subscription model: we get paid a percentage based purely on what we have saved you.",
    metadata: { category: "Financial Savings & Subscription Model", product: "shifter", question: "How does the payment and fee structure work?", answer: "The app runs on a success-oriented subscription model: we get paid a percentage based purely on what we have saved you." }
  },
  {
    id: "shif-010",
    text: "Q: Am I locked into a long-term utility contract? A: No, this is a highly flexible service that lets you cancel or leave at any time without exit fees.",
    metadata: { category: "Financial Savings & Subscription Model", product: "shifter", question: "Am I locked into a long-term utility contract?", answer: "No, this is a highly flexible service that lets you cancel or leave at any time without exit fees." }
  },
  {
    id: "shif-011",
    text: "Q: What specific inverter brands does Shîfter support? A: The platform currently connects via cloud API to major manufacturers including GivEnergy, Solis, AlphaESS, and Huawei.",
    metadata: { category: "Technical Connections & Compatibility", product: "shifter", question: "What specific inverter brands does Shîfter support?", answer: "The platform currently connects via cloud API to major manufacturers including GivEnergy, Solis, AlphaESS, and Huawei." }
  },
  {
    id: "shif-012",
    text: "Q: Can I use the app if my home solar/battery setup has no internet connection? A: No, the system requires an active, stable home Wi-Fi or cellular connection to send automated charging commands to your hybrid inverter.",
    metadata: { category: "Technical Connections & Compatibility", product: "shifter", question: "Can I use the app if my home solar/battery setup has no internet connection?", answer: "No, the system requires an active, stable home Wi-Fi or cellular connection to send automated charging commands to your hybrid inverter." }
  },
  {
    id: "shif-013",
    text: "Q: Does Shîfter require API login credentials for my inverter account? A: Yes, you securely authenticate your account during onboarding so our platform can safely read data and transmit optimized charging schedules.",
    metadata: { category: "Technical Connections & Compatibility", product: "shifter", question: "Does Shîfter require API login credentials for my inverter account?", answer: "Yes, you securely authenticate your account during onboarding so our platform can safely read data and transmit optimized charging schedules." }
  },
  {
    id: "shif-014",
    text: "Q: Can the software manage multiple independent home batteries or hybrid systems? A: Yes, the cloud-based algorithm can aggregate and manage multiple registered inverters under a single master profile dashboard.",
    metadata: { category: "Technical Connections & Compatibility", product: "shifter", question: "Can the software manage multiple independent home batteries or hybrid systems?", answer: "Yes, the cloud-based algorithm can aggregate and manage multiple registered inverters under a single master profile dashboard." }
  },
  {
    id: "shif-015",
    text: "Q: How often does the app refresh or push new battery commands? A: The software calculates optimal pathways continuously, dispatching fresh operational updates ahead of each half-hourly tariff price change.",
    metadata: { category: "Algorithmic Logic & External Factors", product: "shifter", question: "How often does the app refresh or push new battery commands?", answer: "The software calculates optimal pathways continuously, dispatching fresh operational updates ahead of each half-hourly tariff price change." }
  },
  {
    id: "shif-016",
    text: "Q: Does the system account for extreme local weather changes? A: Yes, the AI forecast engine dynamically processes localized meteorological forecasts to predict drop-offs or surges in your upcoming rooftop solar generation.",
    metadata: { category: "Algorithmic Logic & External Factors", product: "shifter", question: "Does the system account for extreme local weather changes?", answer: "Yes, the AI forecast engine dynamically processes localized meteorological forecasts to predict drop-offs or surges in your upcoming rooftop solar generation." }
  },
  {
    id: "shif-017",
    text: "Q: What happens if my household energy consumption shifts suddenly? A: The algorithm continuously monitors real-time changes to prevent unexpected grid drain if you turn on heavy appliances out of schedule.",
    metadata: { category: "Algorithmic Logic & External Factors", product: "shifter", question: "What happens if my household energy consumption shifts suddenly?", answer: "The algorithm continuously monitors real-time changes to prevent unexpected grid drain if you turn on heavy appliances out of schedule." }
  },
  {
    id: "shif-018",
    text: "Q: Does the software support dynamic export tariffs? A: Yes, it maximizes earnings by automatically commanding your battery to discharge and export power back to the grid during maximum peak-payout windows.",
    metadata: { category: "Algorithmic Logic & External Factors", product: "shifter", question: "Does the software support dynamic export tariffs?", answer: "Yes, it maximizes earnings by automatically commanding your battery to discharge and export power back to the grid during maximum peak-payout windows." }
  },
  {
    id: "shif-019",
    text: "Q: Can I manually stop the automation if I need full power instantly? A: Yes, the mobile application provides a one-click manual boost or pause function that immediately suspends automated scheduling.",
    metadata: { category: "Control, Safety & Manual Overrides", product: "shifter", question: "Can I manually stop the automation if I need full power instantly?", answer: "Yes, the mobile application provides a one-click manual boost or pause function that immediately suspends automated scheduling." }
  },
  {
    id: "shif-020",
    text: "Q: Will the app ever charge my battery from the grid using high-carbon energy? A: No, the optimization engine explicitly balances lowest monetary cost against grid carbon intensity to avoid charging during heavily polluting periods.",
    metadata: { category: "Control, Safety & Manual Overrides", product: "shifter", question: "Will the app ever charge my battery from the grid using high-carbon energy?", answer: "No, the optimization engine explicitly balances lowest monetary cost against grid carbon intensity to avoid charging during heavily polluting periods." }
  },
  {
    id: "shif-021",
    text: "Q: Does using an automated management app void my original hardware warranty? A: No, all commands use official manufacturer cloud APIs and strictly stay within factory-defined safety thresholds.",
    metadata: { category: "Control, Safety & Manual Overrides", product: "shifter", question: "Does using an automated management app void my original hardware warranty?", answer: "No, all commands use official manufacturer cloud APIs and strictly stay within factory-defined safety thresholds." }
  },
  {
    id: "shif-022",
    text: "Q: What happens if the Decent Energy server drops offline temporarily? A: Your home inverter instantly defaults back to its native local settings, ensuring your home power supply remains completely unaffected.",
    metadata: { category: "Control, Safety & Manual Overrides", product: "shifter", question: "What happens if the Decent Energy server drops offline temporarily?", answer: "Your home inverter instantly defaults back to its native local settings, ensuring your home power supply remains completely unaffected." }
  },
  {
    id: "shif-023",
    text: "Q: How exactly do you calculate the savings split? A: We calculate savings by comparing your actual bills against a dynamic baseline model simulating what you would have spent under standard factory inverter settings.",
    metadata: { category: "Billing & Performance Verification", product: "shifter", question: "How exactly do you calculate the savings split?", answer: "We calculate savings by comparing your actual bills against a dynamic baseline model simulating what you would have spent under standard factory inverter settings." }
  },
  {
    id: "shif-024",
    text: "Q: Is there a base minimum monthly platform fee if I save nothing? A: No, the contract uses a strict no-win, no-fee split percentage model where you only pay a share of verified savings.",
    metadata: { category: "Billing & Performance Verification", product: "shifter", question: "Is there a base minimum monthly platform fee if I save nothing?", answer: "No, the contract uses a strict no-win, no-fee split percentage model where you only pay a share of verified savings." }
  },
  {
    id: "shif-025",
    text: "Q: How do I cancel my subscription and decouple my hardware? A: You can disconnect your system directly from the app profile settings at any time with zero exit penalties or termination fees.",
    metadata: { category: "Billing & Performance Verification", product: "shifter", question: "How do I cancel my subscription and decouple my hardware?", answer: "You can disconnect your system directly from the app profile settings at any time with zero exit penalties or termination fees." }
  },

  // ─── FLEXER ──────────────────────────────────────────────────────────────
  {
    id: "flex-001",
    text: "Q: What exactly is Flexer? A: It is an app feature that aggregates your household energy assets into a virtual pool, allowing you to get paid for reducing grid stress during official flexibility events.",
    metadata: { category: "Concept & Mechanics", product: "flexer", question: "What exactly is Flexer?", answer: "It is an app feature that aggregates your household energy assets into a virtual pool, allowing you to get paid for reducing grid stress during official flexibility events." }
  },
  {
    id: "flex-002",
    text: "Q: How does Flexer differ from Shîfter? A: Shîfter works daily to optimize your personal energy bills based on your tariff; Flexer activates intermittently during high-demand grid events to generate explicit cash rewards.",
    metadata: { category: "Concept & Mechanics", product: "flexer", question: "How does Flexer differ from Shîfter?", answer: "Shîfter works daily to optimize your personal energy bills based on your tariff; Flexer activates intermittently during high-demand grid events to generate explicit cash rewards." }
  },
  {
    id: "flex-003",
    text: "Q: What is a flexibility event? A: A specific window of time—usually 1 to 2 hours—where the regional grid operator pays consumers to lower their power consumption or export stored battery power to prevent blackouts.",
    metadata: { category: "Concept & Mechanics", product: "flexer", question: "What is a flexibility event?", answer: "A specific window of time—usually 1 to 2 hours—where the regional grid operator pays consumers to lower their power consumption or export stored battery power to prevent blackouts." }
  },
  {
    id: "flex-004",
    text: "Q: Do I have to turn off my appliances manually during a flexibility event? A: No, the software automatically manages your connected inverters, EV chargers, or storage systems to meet the event criteria without requiring your manual intervention.",
    metadata: { category: "Concept & Mechanics", product: "flexer", question: "Do I have to turn off my appliances manually during a flexibility event?", answer: "No, the software automatically manages your connected inverters, EV chargers, or storage systems to meet the event criteria without requiring your manual intervention." }
  },
  {
    id: "flex-005",
    text: "Q: How do I earn money using Flexer? A: You receive cash incentives based on the volume of kilowatt-hours (kWh) you successfully shift or export away from the grid peak during an active event.",
    metadata: { category: "Earnings & Financials", product: "flexer", question: "How do I earn money using Flexer?", answer: "You receive cash incentives based on the volume of kilowatt-hours (kWh) you successfully shift or export away from the grid peak during an active event." }
  },
  {
    id: "flex-006",
    text: "Q: How are my event earnings calculated? A: Earnings are determined by comparing your actual electricity usage during the event against your calculated baseline consumption from preceding days.",
    metadata: { category: "Earnings & Financials", product: "flexer", question: "How are my event earnings calculated?", answer: "Earnings are determined by comparing your actual electricity usage during the event against your calculated baseline consumption from preceding days." }
  },
  {
    id: "flex-007",
    text: "Q: Are there penalties if my asset fails to deliver during an event? A: No, because your hardware is grouped into a broader consumer network, individual delivery shortfalls do not trigger financial penalties for the home user.",
    metadata: { category: "Earnings & Financials", product: "flexer", question: "Are there penalties if my asset fails to deliver during an event?", answer: "No, because your hardware is grouped into a broader consumer network, individual delivery shortfalls do not trigger financial penalties for the home user." }
  },
  {
    id: "flex-008",
    text: "Q: How do I get paid out from Flexer? A: Accumulated event rewards are credited directly to your platform account dashboard, which can be withdrawn or applied as a credit against your platform usage fees.",
    metadata: { category: "Earnings & Financials", product: "flexer", question: "How do I get paid out from Flexer?", answer: "Accumulated event rewards are credited directly to your platform account dashboard, which can be withdrawn or applied as a credit against your platform usage fees." }
  },
  {
    id: "flex-009",
    text: "Q: Can I opt out of a specific Flexer event? A: Yes, you receive an advance notification via the app before any grid event begins, allowing you to opt out if you need uninterrupted power usage.",
    metadata: { category: "Participation & Control", product: "flexer", question: "Can I opt out of a specific Flexer event?", answer: "Yes, you receive an advance notification via the app before any grid event begins, allowing you to opt out if you need uninterrupted power usage." }
  },
  {
    id: "flex-010",
    text: "Q: Will participating in Flexer drain my home battery completely? A: No, the optimization algorithm ensures that your system retains a baseline safety reserve, preventing your home from losing power.",
    metadata: { category: "Participation & Control", product: "flexer", question: "Will participating in Flexer drain my home battery completely?", answer: "No, the optimization algorithm ensures that your system retains a baseline safety reserve, preventing your home from losing power." }
  },
  {
    id: "flex-011",
    text: "Q: Do I need a specific energy supplier to use Flexer? A: Because the software operates independently of retail utilities, you can participate regardless of your current home electricity supplier.",
    metadata: { category: "Participation & Control", product: "flexer", question: "Do I need a specific energy supplier to use Flexer?", answer: "Because the software operates independently of retail utilities, you can participate regardless of your current home electricity supplier." }
  },
  {
    id: "flex-012",
    text: "Q: How far in advance am I notified of a grid flexibility event? A: Notifications are typically sent via app alert between 4 and 24 hours before an event starts, depending on when the grid operator publishes the activation notice.",
    metadata: { category: "Event Notification & Opt-In Rules", product: "flexer", question: "How far in advance am I notified of a grid flexibility event?", answer: "Notifications are typically sent via app alert between 4 and 24 hours before an event starts, depending on when the grid operator publishes the activation notice." }
  },
  {
    id: "flex-013",
    text: "Q: What happens if I miss a Flexer notification and do not respond? A: The system operates on an automated opt-in configuration. If you do not manually opt-out, your system will participate automatically to secure your earnings.",
    metadata: { category: "Event Notification & Opt-In Rules", product: "flexer", question: "What happens if I miss a Flexer notification and do not respond?", answer: "The system operates on an automated opt-in configuration. If you do not manually opt-out, your system will participate automatically to secure your earnings." }
  },
  {
    id: "flex-014",
    text: "Q: Can I opt out midway through an active live Flexer event? A: Yes, you can hit the manual override button in the app at any point during a live event to instantly decouple your home hardware from the active pool.",
    metadata: { category: "Event Notification & Opt-In Rules", product: "flexer", question: "Can I opt out midway through an active live Flexer event?", answer: "Yes, you can hit the manual override button in the app at any point during a live event to instantly decouple your home hardware from the active pool." }
  },
  {
    id: "flex-015",
    text: "Q: How frequently do flexibility events occur? A: Events are highly seasonal. They occur more frequently during winter peak evenings, averaging 2 to 4 events per month under normal grid operating conditions.",
    metadata: { category: "Event Notification & Opt-In Rules", product: "flexer", question: "How frequently do flexibility events occur?", answer: "Events are highly seasonal. They occur more frequently during winter peak evenings, averaging 2 to 4 events per month under normal grid operating conditions." }
  },
  {
    id: "flex-016",
    text: "Q: How does Flexer prep my home battery right before an event? A: The platform triggers a strategy called pre-charging. It imports low-cost or green electricity just before the event window so your battery is fully prepared to export at peak payout rates.",
    metadata: { category: "Algorithmic Strategy & Fleet Logic", product: "flexer", question: "How does Flexer prep my home battery right before an event?", answer: "The platform triggers a strategy called pre-charging. It imports low-cost or green electricity just before the event window so your battery is fully prepared to export at peak payout rates." }
  },
  {
    id: "flex-017",
    text: "Q: What is the difference between consumption reduction and generation export in Flexer? A: Consumption reduction means turning your home imports down to zero. Generation export means aggressively pushing power from your battery back out to the grid for maximum payment.",
    metadata: { category: "Algorithmic Strategy & Fleet Logic", product: "flexer", question: "What is the difference between consumption reduction and generation export in Flexer?", answer: "Consumption reduction means turning your home imports down to zero. Generation export means aggressively pushing power from your battery back out to the grid for maximum payment." }
  },
  {
    id: "flex-018",
    text: "Q: How does Flexer handle assets without home batteries? A: For standalone EV chargers or heat pumps, the app temporarily pauses charging cycles or lowers thermal output during the event hour to log consumption drops.",
    metadata: { category: "Algorithmic Strategy & Fleet Logic", product: "flexer", question: "How does Flexer handle assets without home batteries?", answer: "For standalone EV chargers or heat pumps, the app temporarily pauses charging cycles or lowers thermal output during the event hour to log consumption drops." }
  },
  {
    id: "flex-019",
    text: "Q: Can I run heavy appliances like a washing machine during a Flexer event? A: It is highly discouraged. Doing so will counteract your battery's export efforts, lower your performance baseline, and significantly reduce your final financial payout.",
    metadata: { category: "Algorithmic Strategy & Fleet Logic", product: "flexer", question: "Can I run heavy appliances like a washing machine during a Flexer event?", answer: "It is highly discouraged. Doing so will counteract your battery's export efforts, lower your performance baseline, and significantly reduce your final financial payout." }
  },
  {
    id: "flex-020",
    text: "Q: How is my performance baseline calculated for a Flexer event? A: The system uses TSO-approved methodologies. It averages your smart meter consumption from the same time block over the last 10 working days to find your normal usage line.",
    metadata: { category: "Baseline Calculations & Disputes", product: "flexer", question: "How is my performance baseline calculated for a Flexer event?", answer: "The system uses TSO-approved methodologies. It averages your smart meter consumption from the same time block over the last 10 working days to find your normal usage line." }
  },
  {
    id: "flex-021",
    text: "Q: Why did my neighbor earn more than me for the same Flexer event? A: Payouts depend on your specific baseline capacity. A household that shifts a large EV charging load or exports from a 10kWh battery will naturally earn more than a low-consumption home.",
    metadata: { category: "Baseline Calculations & Disputes", product: "flexer", question: "Why did my neighbor earn more than me for the same Flexer event?", answer: "Payouts depend on your specific baseline capacity. A household that shifts a large EV charging load or exports from a 10kWh battery will naturally earn more than a low-consumption home." }
  },
  {
    id: "flex-022",
    text: "Q: What happens if my home smart meter stops reporting during a Flexer event? A: If a data dropout occurs, the platform cross-references internal telemetry from your inverter API to verify delivery and secure your data integrity.",
    metadata: { category: "Baseline Calculations & Disputes", product: "flexer", question: "What happens if my home smart meter stops reporting during a Flexer event?", answer: "If a data dropout occurs, the platform cross-references internal telemetry from your inverter API to verify delivery and secure your data integrity." }
  },
  {
    id: "flex-023",
    text: "Q: Who handles disputes if the grid operator miscalculates event data? A: We manage all settlement reconciliations with the grid operators directly on behalf of our entire virtual network pool.",
    metadata: { category: "Baseline Calculations & Disputes", product: "flexer", question: "Who handles disputes if the grid operator miscalculates event data?", answer: "We manage all settlement reconciliations with the grid operators directly on behalf of our entire virtual network pool." }
  },
  {
    id: "flex-024",
    text: "Q: Does rapid cycling during flexibility events degrade my battery cells? A: No, the system works completely within original factory voltage boundaries and avoids rapid micro-cycling to maintain long-term asset health.",
    metadata: { category: "Hardware Wear & Privacy Security", product: "flexer", question: "Does rapid cycling during flexibility events degrade my battery cells?", answer: "No, the system works completely within original factory voltage boundaries and avoids rapid micro-cycling to maintain long-term asset health." }
  },
  {
    id: "flex-025",
    text: "Q: Does participating in Flexer expose my home energy habits to third parties? A: No, your personal smart meter telemetry is aggregated into an anonymous data pool before it is shared with national or regional grid operators.",
    metadata: { category: "Hardware Wear & Privacy Security", product: "flexer", question: "Does participating in Flexer expose my home energy habits to third parties?", answer: "No, your personal smart meter telemetry is aggregated into an anonymous data pool before it is shared with national or regional grid operators." }
  },
  {
    id: "flex-026",
    text: "Q: Can I use Shîfter and Flexer simultaneously on my account? A: Yes, they are designed to work together. Shîfter lowers your everyday electricity baseline bills, while Flexer steps in to capture premium spot revenue spikes.",
    metadata: { category: "Hardware Wear & Privacy Security", product: "flexer", question: "Can I use Shîfter and Flexer simultaneously on my account?", answer: "Yes, they are designed to work together. Shîfter lowers your everyday electricity baseline bills, while Flexer steps in to capture premium spot revenue spikes." }
  }
];
