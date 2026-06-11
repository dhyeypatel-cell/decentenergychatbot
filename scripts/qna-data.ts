export interface QnAEntry {
  id: string;
  question: string;
  answer: string;
  category: string;
  product: string;
}

export const qnaData: QnAEntry[] = [
  // ─── Overview ────────────────────────────────────────────────────────────────
  {
    id: "de-overview-001",
    question: "What is Decent Energy?",
    answer:
      "Decent Energy is a company that builds smart energy management products to help homeowners save money on electricity bills and reduce their carbon footprint. Their main products are Shîfter (smart battery management) and Flexer (grid flexibility rewards).",
    category: "overview",
    product: "decentenergy",
  },
  {
    id: "de-overview-002",
    question: "What is ShifterSimulator?",
    answer:
      "ShifterSimulator is Decent Energy's battery optimisation and energy management platform. It automatically decides when a customer's home battery storage system should charge and when it should discharge, in order to minimise electricity costs and carbon footprint. Every day it collects live data, runs an optimisation algorithm to produce a 30-minute resolution charge/discharge schedule, pushes that schedule to the Shifter Service (the control plane that talks to physical hardware), and sends customers a WhatsApp summary of tomorrow's plan.",
    category: "overview",
    product: "shifter",
  },
  {
    id: "de-overview-003",
    question: "What problem does ShifterSimulator solve?",
    answer:
      "Electricity prices in the UK change throughout the day. During off-peak hours (usually at night) electricity is cheap; during peak hours (morning and evening) it is expensive. Most homeowners with a battery do not know the best time to charge or discharge, so they either waste money or miss savings opportunities. ShifterSimulator solves this by watching prices daily, predicting consumption and solar generation, checking carbon intensity, and computing the optimal charge/discharge plan automatically.",
    category: "overview",
    product: "shifter",
  },
  {
    id: "de-overview-004",
    question: "Who uses ShifterSimulator?",
    answer:
      "Three groups use ShifterSimulator: (1) Customers — homeowners with solar panels and battery storage on smart tariffs like Octopus Agile, who receive a daily WhatsApp message summarising tomorrow's battery plan. (2) The Decent Energy team — uses the system to monitor performance, onboard new customers, track savings, and manage the platform. (3) Physical inverter hardware — the Shifter Service reads the instructions and sends commands to the customer's battery.",
    category: "overview",
    product: "shifter",
  },
  {
    id: "de-overview-005",
    question: "What is Shîfter?",
    answer:
      "Shîfter is Decent Energy's smart battery management product. It automatically controls home battery storage systems to charge when electricity is cheap and discharge when it is expensive, saving customers money and reducing carbon emissions. The core engine is ShifterSimulator.",
    category: "overview",
    product: "shifter",
  },
  {
    id: "de-overview-006",
    question: "What is Flexer?",
    answer:
      "Flexer is Decent Energy's grid flexibility rewards product. It allows customers to earn rewards by adjusting their energy usage in response to grid signals, helping balance the electricity grid.",
    category: "overview",
    product: "flexer",
  },
  {
    id: "de-overview-007",
    question: "What is the technology stack of ShifterSimulator?",
    answer:
      "ShifterSimulator is built on Python 3.12 with FastAPI 0.104 and Uvicorn 0.24 for the API. Data processing uses Pandas 2.3 and NumPy 2.3. Data validation uses Pydantic 2.11. The primary database is PostgreSQL with SQLAlchemy 2.0; the secondary database is MongoDB. Messaging is via Twilio (WhatsApp) and Slack. Error tracking uses Sentry SDK 2.20. Scheduling is via Apache Airflow (external). Containers use Docker and CI/CD runs on GitHub Actions. Geospatial features use GeoPandas and Shapely; daylight calculations use Astral 3.2.",
    category: "architecture",
    product: "shifter",
  },

  // ─── Daily Operations ────────────────────────────────────────────────────────
  {
    id: "de-daily-001",
    question: "What does ShifterSimulator do every day?",
    answer:
      "Every day ShifterSimulator: (1) Collects fresh data overnight — electricity prices from Octopus Energy, carbon intensity from the national grid API, live inverter readings, and smart meter readings, all stored in PostgreSQL. (2) Every morning it generates a battery plan for each active customer by running the optimisation algorithm over 48 half-hour slots. (3) Pushes the schedule to the Shifter Service (MongoDB) so the inverter controller can execute it. (4) Sends each customer a WhatsApp message summarising tomorrow's plan. (5) Runs monitoring scripts throughout the day to check accuracy and data health.",
    category: "daily-pipeline",
    product: "shifter",
  },
  {
    id: "de-daily-002",
    question: "What data does ShifterSimulator collect each day?",
    answer:
      "ShifterSimulator collects four types of data daily: (1) Electricity prices — half-hourly import/export tariff rates from Octopus Energy (Agile prices change every 30 minutes). (2) Carbon intensity — 14-day regional forecast from carbonintensity.org.uk, showing gCO2/kWh at each time slot. (3) Inverter readings — live SOC and power data fetched from each customer's inverter cloud (Solis, FoxESS, GivEnergy, SolarEdge, or Eleven). (4) Smart meter readings — actual consumption from Octopus. All data is stored in PostgreSQL for next-morning use.",
    category: "daily-pipeline",
    product: "shifter",
  },
  {
    id: "de-daily-003",
    question: "What is the time resolution of the battery schedule?",
    answer:
      "The battery schedule has a 30-minute resolution — 48 half-hour slots per day, each in UTC.",
    category: "daily-pipeline",
    product: "shifter",
  },
  {
    id: "de-daily-004",
    question: "What is the ForecastPipeline and how does it work?",
    answer:
      "ForecastPipeline is the top-level daily orchestrator in app/shifter/pipelines/forecast.py. For each active installation it: (a) fetches live inverter SOC and power from the cloud API, (b) retrieves a consumption forecast, (c) retrieves pricing data from Octopus or the PostgreSQL cache, (d) retrieves carbon intensity from PostgreSQL, (e) retrieves the PV solar forecast, (f) builds an InstallationContext from the Accounts API, (g) creates a ShifterContext bundling all data, (h) runs ShifterOrchestrator to get a schedule, (i) validates the schedule, (j) pushes the schedule to the Shifter Service via MongoDB, and (k) sends a WhatsApp notification to the customer.",
    category: "daily-pipeline",
    product: "shifter",
  },
  {
    id: "de-daily-005",
    question: "What are the daily data processor scripts?",
    answer:
      "The daily data processors in daily_data_processors/ are Airflow-invoked standalone scripts: forecasting_shifter.py (runs every morning — full forecast pipeline for all active customers), inverter_daily_data_processor.py (daily — collects inverter telemetry and stores to PostgreSQL), pricing_daily_data_processor.py (daily — fetches tariff rates), carbon_daily_data_processor.py (daily — fetches carbon intensity), meter_daily_data_processor.py (daily — ingests smart meter consumption), historical_shifter.py (on-demand — backtests the optimiser against historical data), new_customer_check.py (daily — validates onboarding data and syncs tariffs), battery_sizing_processor.py (on-demand — analyses battery utilisation and recommends sizing changes), peak_failsafe.py (daily — enforces demand-side management peak export caps).",
    category: "daily-pipeline",
    product: "shifter",
  },

  // ─── Optimisation Algorithm ──────────────────────────────────────────────────
  {
    id: "de-optim-001",
    question: "How does the battery optimisation algorithm work?",
    answer:
      "ShifterSimulator uses a Dynamic Programming (DP) algorithm. It looks at all 48 half-hour slots of the day and finds the combination of charge/discharge decisions that minimises a combined cost score. The score is: combined_cost = alpha × price_per_kWh + (1 - alpha) × carbon_intensity_gCO2. The algorithm tries a multi-day DP pass first; if that fails it falls back to per-day DP; if that also fails it falls back to the SimpleScheduler rule-based approach. This ensures a customer's battery always has a plan.",
    category: "optimization",
    product: "shifter",
  },
  {
    id: "de-optim-002",
    question: "What is the default optimisation weight between price and carbon?",
    answer:
      "The default is alpha = 0.8, meaning 80% weight on minimising electricity cost and 20% weight on minimising carbon intensity. alpha = 1.0 is pure price minimisation; alpha = 0.0 is pure carbon minimisation. Customers can adjust this balance per their preference.",
    category: "optimization",
    product: "shifter",
  },
  {
    id: "de-optim-003",
    question: "Can customers choose to prioritise green energy over cost savings?",
    answer:
      "Yes. Each customer has a cost_bias (alpha) setting ranging from 0.0 to 1.0. Setting alpha = 0.0 makes the system optimise purely for carbon reduction (greenest possible plan). Setting alpha = 1.0 optimises purely for cost. The default is 0.8 (80% price, 20% carbon). This is configured per customer in their InstallationContext.",
    category: "optimization",
    product: "shifter",
  },
  {
    id: "de-optim-004",
    question: "What battery actions can the scheduler produce?",
    answer:
      "The scheduler produces five possible actions for each 30-minute slot: (1) Charge battery — draw power from the grid to charge the battery. (2) Use battery — discharge the battery to cover the home's load. (3) Defer use — hold off and wait for a better price slot. (4) Allow solar — let excess PV generation charge the battery. (5) Do nothing — no action (used as a stub or padding slot).",
    category: "optimization",
    product: "shifter",
  },
  {
    id: "de-optim-005",
    question: "What physical constraints does the battery scheduler respect?",
    answer:
      "The scheduler enforces three physical constraints: (1) Hardware cap — the inverter's rated AC power limits how fast the battery can charge or discharge. (2) CC/CV charge curve — an empirical fitted model per customer: constant current below the knee_soc threshold, then an exponential taper above it (mimicking the real battery's charge behaviour). (3) Peak reserve — the battery must hold enough charge during the evening peak (4–9 PM) to cover remaining peak demand.",
    category: "optimization",
    product: "shifter",
  },
  {
    id: "de-optim-006",
    question: "What is the difference between SimpleScheduler and DynamicProgrammingScheduler?",
    answer:
      "DynamicProgrammingScheduler (dp_scheduler.py) finds the mathematically optimal schedule by evaluating every combination of charge/discharge decisions using backward/forward DP passes. It is used for customers on dynamic tariffs like Agile where prices vary every 30 minutes. SimpleScheduler (simple_scheduler.py) is a rule-based heuristic: charge when prices are cheap, discharge when prices are expensive. It is used for customers on simple flat-rate tariffs (shifter_level = 'simple_shifter') and as a fallback if DP fails.",
    category: "optimization",
    product: "shifter",
  },
  {
    id: "de-optim-007",
    question: "What happens if the smart optimisation algorithm fails?",
    answer:
      "ShifterSimulator has a layered fallback: ShifterOrchestrator first tries multi-day DP, then falls back to per-day DP via DayScheduler (which retries up to 3 times), and if all DP attempts fail, it falls back to SimpleScheduler (the rule-based heuristic). This guarantees that a customer's battery always receives some plan even if the optimal algorithm encounters an error.",
    category: "optimization",
    product: "shifter",
  },
  {
    id: "de-optim-008",
    question: "What is an example battery schedule output?",
    answer:
      "A typical day's schedule might look like: 01:00–03:00 → Charge battery (cheap overnight electricity); 07:00–09:00 → Use battery (avoid expensive morning peak); 11:00–14:00 → Allow solar (let panels charge battery and cover load); 17:00–20:00 → Use battery (avoid expensive evening peak); all other slots → Do nothing (buy from grid at normal rate).",
    category: "optimization",
    product: "shifter",
  },

  // ─── Data Retrieval ──────────────────────────────────────────────────────────
  {
    id: "de-data-001",
    question: "Where does ShifterSimulator get electricity prices?",
    answer:
      "Electricity prices are fetched from the Octopus Energy API. The module octopus/octopus_pricing.py retrieves half-hourly import and export tariff rates. For Agile tariff customers, prices are fetched fresh daily because they change every 30 minutes. Prices are cached in PostgreSQL so the optimiser can access them quickly each morning.",
    category: "data-retrieval",
    product: "shifter",
  },
  {
    id: "de-data-002",
    question: "Where does ShifterSimulator get carbon intensity data?",
    answer:
      "Carbon intensity data is fetched from carbonintensity.org.uk via the module carbon_intensity_data_retrieval.py. It provides a 14-day regional carbon intensity forecast in gCO2/kWh for each 30-minute slot. Missing values are filled via linear interpolation (up to 4 consecutive slots). If a customer's regional code is missing, the system falls back to the national average.",
    category: "data-retrieval",
    product: "shifter",
  },
  {
    id: "de-data-003",
    question: "Where does ShifterSimulator get solar generation forecasts?",
    answer:
      "Solar (PV) generation forecasts are pulled from a PostgreSQL table (data_sources.decent_solar_forecast). These forecasts are powered by Solcast irradiance data and are calibrated per customer. The module retrieve_solar_forecasts.py handles this retrieval.",
    category: "data-retrieval",
    product: "shifter",
  },
  {
    id: "de-data-004",
    question: "Where does ShifterSimulator get live inverter and battery data?",
    answer:
      "Live SOC (state of charge) and power readings are fetched directly from each customer's inverter cloud API. The module retrieve_inverter_data_any.py handles all supported brands: Solis (REST API with serial + API key), FoxESS (foxess-cloud Python library), GivEnergy (Cloud REST API), SolarEdge (REST API), and Eleven (REST API).",
    category: "data-retrieval",
    product: "shifter",
  },

  // ─── Inverter Hardware ───────────────────────────────────────────────────────
  {
    id: "de-inverter-001",
    question: "Which inverter brands does ShifterSimulator support?",
    answer:
      "ShifterSimulator supports five inverter brands: Solis (REST API with serial number and API key), FoxESS (foxess-cloud Python library), GivEnergy (Cloud REST API), SolarEdge (REST API), and Eleven (REST API). Each brand has its own cloud API with different authentication and data formats, all handled transparently.",
    category: "inverters",
    product: "shifter",
  },
  {
    id: "de-inverter-002",
    question: "What is the Shifter Service?",
    answer:
      "The Shifter Service is a separate control-plane system that interfaces directly with physical inverters. ShifterSimulator generates the optimised schedule and posts it to the Shifter Service via MongoDB. The inverter controller running in the customer's home periodically polls MongoDB and executes the instructions (e.g. charge at 01:00, discharge at 17:00). ShifterSimulator communicates with it via the SHIFTERSERVICE_URL/API_KEY environment variables.",
    category: "inverters",
    product: "shifter",
  },
  {
    id: "de-inverter-003",
    question: "How does ShifterSimulator handle customers with multiple inverters?",
    answer:
      "Currently, charge curves are keyed per customer rather than per device. This means a customer with two inverters gets the same CC/CV charge curve applied to both. This is a known limitation noted as a TODO in models/inverter.py.",
    category: "inverters",
    product: "shifter",
  },

  // ─── REST API ────────────────────────────────────────────────────────────────
  {
    id: "de-api-001",
    question: "What REST API does ShifterSimulator expose?",
    answer:
      "ShifterSimulator runs a FastAPI service on port 3003 with three endpoints: GET / (health check, no auth), GET /inverter/reporting-data (returns half-hourly inverter telemetry, requires X-Api-Key header), and GET /_sentry-test (triggers a test Sentry error, no auth). The data is sourced from the PostgreSQL view inverter_data.inverter_reporting_data.",
    category: "api",
    product: "shifter",
  },
  {
    id: "de-api-002",
    question: "How do I query inverter telemetry data from the API?",
    answer:
      "Send a GET request to /inverter/reporting-data with the X-Api-Key header set to your API token (configured via the API_TOKEN environment variable). Include query parameters: ci (int, customer ID), start_ts (ISO datetime, start of window), end_ts (ISO datetime, end of window). The response returns one record per 30-minute slot with fields: customer_id, timestamp, consumption_kwh, pv_kwh, battery_diff_kwh, grid_import_kwh, grid_export_kwh.",
    category: "api",
    product: "shifter",
  },
  {
    id: "de-api-003",
    question: "What authentication does the ShifterSimulator API use?",
    answer:
      "The /inverter/reporting-data endpoint uses API key authentication via the X-Api-Key HTTP header. The expected key is set in the API_TOKEN environment variable. The health check (/) and Sentry test (/_sentry-test) endpoints require no authentication.",
    category: "api",
    product: "shifter",
  },
  {
    id: "de-api-004",
    question: "What fields does the inverter reporting data API return?",
    answer:
      "For each 30-minute slot the API returns: customer_id, timestamp (UTC), consumption_kwh (expected grid import in kWh), pv_kwh (solar generation in kWh), battery_diff_kwh (net battery charge/discharge in kWh), grid_import_kwh (energy imported from grid in kWh), grid_export_kwh (energy exported to grid in kWh).",
    category: "api",
    product: "shifter",
  },

  // ─── Notifications ───────────────────────────────────────────────────────────
  {
    id: "de-notify-001",
    question: "How are customers notified about their battery plan?",
    answer:
      "Customers receive a WhatsApp message once per day via Twilio. The message is sent using Twilio content templates (6 variables per message) and contains a plain-English summary of tomorrow's battery plan: charge cycle count, average cost per kWh, discharge cycle count, average saving per kWh, and the timing of the first few actions. Notifications are only sent in production (PC_NAME must not equal 'decent_staging').",
    category: "notifications",
    product: "shifter",
  },
  {
    id: "de-notify-002",
    question: "What information is in the daily WhatsApp message to customers?",
    answer:
      "The daily WhatsApp message (sent via send_whatsapp_actions_message()) includes: how many charge cycles are planned and the average cost per kWh for charging; how many discharge cycles are planned and the average saving per kWh from discharging; and the timing of the first 3 planned actions. It is sent once per day per customer regardless of how many times the pipeline runs.",
    category: "notifications",
    product: "shifter",
  },
  {
    id: "de-notify-003",
    question: "Does ShifterSimulator send WhatsApp messages in the staging environment?",
    answer:
      "No. WhatsApp messages (and all commands to physical hardware) are suppressed in the staging environment. Sending only happens when PC_NAME equals 'decent_production'. This prevents accidental messages to real customers or unwanted commands to live inverter hardware during testing.",
    category: "notifications",
    product: "shifter",
  },
  {
    id: "de-notify-004",
    question: "What Slack alerts does ShifterSimulator send?",
    answer:
      "ShifterSimulator sends Slack alerts for: ERROR and WARNING level operational events in production, new customer signup notifications, and tariff mismatch alerts when the Octopus tariff records don't match the internal Accounts API. The Slack bot token is configured via the SLACK_TOKEN environment variable.",
    category: "notifications",
    product: "shifter",
  },
  {
    id: "de-notify-005",
    question: "What happens when a new customer signs up?",
    answer:
      "When a new customer is onboarded, ShifterSimulator sends them a welcome WhatsApp message and an onboarding email letting them know the system has started managing their battery. The new_customer_check.py daily processor validates onboarding data integrity and syncs tariffs. The Slack channel also receives a new customer signup notification.",
    category: "notifications",
    product: "shifter",
  },

  // ─── Monitoring ──────────────────────────────────────────────────────────────
  {
    id: "de-monitor-001",
    question: "What monitoring does ShifterSimulator have?",
    answer:
      "ShifterSimulator has several monitoring scripts in monitoring_scripts/: battery_soc_deviation.py (checks if actual battery SOC matches the predicted plan), carbon_data_checker.py (verifies carbon intensity data completeness for the next 48 hours), check_for_high_prices.py and check_for_low_prices.py (alert on unusual pricing), daily_forecast_accuracy_report.py (compares predicted vs actual savings), new_customer_signups.py (tracks onboarding pipeline), and savings_comparison_report.py (financial analysis reports). Error tracking uses Sentry (10% performance sample rate). All ERROR/WARNING events trigger Slack alerts in production.",
    category: "monitoring",
    product: "shifter",
  },
  {
    id: "de-monitor-002",
    question: "How does ShifterSimulator track errors and exceptions?",
    answer:
      "ShifterSimulator uses Sentry SDK 2.20 for error tracking. It captures unhandled exceptions and performance traces at a 10% sample rate. Sentry is initialised per component (api, pipelines, processors) via the SENTRY_DSN environment variable. Additionally, Slack alerts are automatically sent for ERROR and WARNING log events in production.",
    category: "monitoring",
    product: "shifter",
  },
  {
    id: "de-monitor-003",
    question: "How does ShifterSimulator validate the generated schedule?",
    answer:
      "After every optimisation run, schedule_validator.py checks: SOC bounds (battery never goes below minimum or above maximum), direction alignment (charge/discharge actions match the energy flow direction), rate limits (power never exceeds the inverter's rated capacity), and NaN actions (no undefined slots). All validation checks are warning-only — a schedule is never rejected or blocked from being pushed, only flagged.",
    category: "monitoring",
    product: "shifter",
  },

  // ─── CRM / Accounts ──────────────────────────────────────────────────────────
  {
    id: "de-crm-001",
    question: "What is the Accounts API?",
    answer:
      "The Accounts API is an internal Decent Energy service that stores and serves customer and installation configuration. ShifterSimulator calls it to fetch each customer's setup: what inverter they have, how big their battery is, what electricity tariff they're on, where they live, whether they have solar panels, and what their minimum battery level must be. It is accessed via the ACCOUNTS_API_URL and ACCOUNTS_API_TOKEN environment variables.",
    category: "crm",
    product: "decentenergy",
  },
  {
    id: "de-crm-002",
    question: "How does ShifterSimulator integrate with HubSpot?",
    answer:
      "The module app/crm/hubspot_send_data.py syncs customer events to HubSpot CRM. This keeps the Decent Energy sales and support team updated with customer lifecycle events.",
    category: "crm",
    product: "decentenergy",
  },
  {
    id: "de-crm-003",
    question: "How does ShifterSimulator handle tariff mismatches?",
    answer:
      "The module app/crm/crm_customer_comparison.py compares Octopus tariff records against the internal Accounts API and syncs any mismatches. If discrepancies are found, Slack alerts are sent to the Decent Energy team. The new_customer_check.py processor also validates tariff data integrity daily.",
    category: "crm",
    product: "shifter",
  },

  // ─── Domain Models ───────────────────────────────────────────────────────────
  {
    id: "de-model-001",
    question: "What is InstallationContext?",
    answer:
      "InstallationContext is the main configuration object for a customer's installation. It contains: customer_id (int), shifter_level ('simple_shifter' or 'smart_shifter'), cost_bias/alpha (float 0.0–1.0, price vs carbon weight), inverter (AC capacity in kW, charge/discharge curves, serial number), battery (BatteryDevice — capacity in kWh, min SOC %, capacity history), import_connection (GridConnection — import MPAN, supplier, tariff history), export_connection (GridConnection — export MPAN, export tariff history), solar_array (SolarArray — PV capacity in kWp, pitch, azimuth), customer (name, email, WhatsApp number), and integration (InverterIntegration — cloud API credentials).",
    category: "architecture",
    product: "shifter",
  },
  {
    id: "de-model-002",
    question: "What is ShifterContext?",
    answer:
      "ShifterContext (shifter_context.py) bundles together everything needed for a single optimisation run: the InstallationContext (customer configuration), a time-series DataFrame with 48 half-hourly rows of forecast data, and the customer's live battery SOC at the time of scheduling.",
    category: "architecture",
    product: "shifter",
  },
  {
    id: "de-model-003",
    question: "What does the time-series DataFrame input to the optimiser look like?",
    answer:
      "Each row in the DataFrame represents one 30-minute UTC slot. Columns are: Timestamp (UTC datetime — slot start time), Consumption (kWh — expected grid import), Price (p/kWh — import tariff rate), Cost (£ = Consumption × Price), Carbon_intensity (gCO2/kWh — regional carbon forecast), PV_forecast (kWh — calibrated solar generation forecast), Export_Price (p/kWh — optional export tariff rate), Product (str — tariff code/name).",
    category: "architecture",
    product: "shifter",
  },

  // ─── Environment / Config ────────────────────────────────────────────────────
  {
    id: "de-env-001",
    question: "What environment variables does ShifterSimulator require?",
    answer:
      "Key environment variables (set via .env file): API_TOKEN (FastAPI X-Api-Key value), PGSQL_HOST/PORT/DB/USER/PASS (PostgreSQL connection), MONGODB_ACCOUNTS_URI (MongoDB for customer metadata), MONGODB_STATS_URI (MongoDB for instruction statistics), ACCOUNTS_API_URL/TOKEN (internal Accounts API), SHIFTERSERVICE_URL/API_KEY (control-plane Shifter Service), PC_NAME (deployment identifier — 'decent_production' enables live messaging), TWILIO_SID/TOKEN/NUMBER (WhatsApp credentials), TWILIO_ACTIONS_TEMPLATE (Twilio content template SID), SLACK_TOKEN (Slack bot token), SENTRY_DSN (error tracking endpoint), SOLCAST_API_KEY (solar irradiance API), DICT_FILES (path to shared JSON lookup dictionaries).",
    category: "environment",
    product: "shifter",
  },
  {
    id: "de-env-002",
    question: "How do I run ShifterSimulator locally?",
    answer:
      "To run ShifterSimulator locally: start the inverter telemetry API on port 3003 with 'python run_api.py'; run the daily forecast pipeline with 'python daily_data_processors/forecasting_shifter.py'; collect inverter data for a specific date with 'python daily_data_processors/inverter_daily_data_processor.py 2026-06-09'; run historical backtesting with 'python daily_data_processors/historical_shifter.py 2026-06-09'; seed the PostgreSQL lookup tables with 'python json_to_db_migration.py'; or build the Docker image with 'docker build -t shifter-simulator .'",
    category: "environment",
    product: "shifter",
  },
  {
    id: "de-env-003",
    question: "What is the difference between staging and production in ShifterSimulator?",
    answer:
      "The PC_NAME environment variable controls the deployment mode. When PC_NAME equals 'decent_production', live messaging is enabled — WhatsApp messages are sent to real customers and schedule commands are sent to physical hardware. In the staging environment (PC_NAME = 'decent_staging'), no WhatsApp messages are sent and no commands are sent to real hardware. This prevents accidental customer interactions or hardware changes during testing.",
    category: "environment",
    product: "shifter",
  },

  // ─── Special Cases / Limitations ─────────────────────────────────────────────
  {
    id: "de-special-001",
    question: "How does ShifterSimulator handle battery degradation over time?",
    answer:
      "ShifterSimulator tracks battery capacity history in the BatteryDevice model. Over time, as a battery's real capacity shrinks due to degradation, the system uses the correct current capacity when generating schedules rather than assuming the original specification. This ensures the optimiser's energy calculations remain accurate as the battery ages.",
    category: "special-cases",
    product: "shifter",
  },
  {
    id: "de-special-002",
    question: "What is the difference between simple_shifter and smart_shifter?",
    answer:
      "shifter_level = 'simple_shifter' uses the rule-based SimpleScheduler — it charges during off-peak hours and discharges during peak hours. This is used for customers on simple flat-rate tariffs where prices don't vary throughout the day. shifter_level = 'smart_shifter' uses the full Dynamic Programming optimiser, which finds the mathematically optimal schedule accounting for every half-hour price and carbon variation. Smart shifter is used for dynamic tariffs like Octopus Agile.",
    category: "optimization",
    product: "shifter",
  },
  {
    id: "de-special-003",
    question: "What are the known limitations of ShifterSimulator?",
    answer:
      "Three known limitations are documented in the code: (1) Charge curves are keyed per customer, not per device — a customer with two inverters gets the same CC/CV curve applied to both (noted as a TODO in models/inverter.py). (2) Consumption forecasts are assumed to be provided by an external caller; ShifterSimulator does not generate them internally. (3) Schedule validation checks are all warning-only — a schedule is never blocked from being pushed, only flagged with warnings.",
    category: "special-cases",
    product: "shifter",
  },
  {
    id: "de-special-004",
    question: "How does ShifterSimulator handle missing carbon intensity data?",
    answer:
      "If carbon intensity values are missing for some time slots, ShifterSimulator fills them via linear interpolation for up to 4 consecutive 30-minute slots. If a customer's regional carbon intensity code is not available, the system falls back to the national average carbon intensity.",
    category: "data-retrieval",
    product: "shifter",
  },

  // ─── CI/CD & Deployment ──────────────────────────────────────────────────────
  {
    id: "de-cicd-001",
    question: "How is ShifterSimulator deployed?",
    answer:
      "ShifterSimulator is deployed via GitHub Actions CI/CD workflows: deploy-staging.yaml (manual trigger — SSH deploy to Linode staging VPS), deployproduction.yaml (manual — SSH deploy to production VPS), deploydevelopment.yaml (manual — SSH deploy to development VPS), deploy-toregistry.yaml (manual — push Docker image to container registry), bump-version-onpr.yaml (auto-increments version on PR open), pylint.yaml (Python linting on PR/push), and dependabot.yml (automated dependency updates).",
    category: "environment",
    product: "shifter",
  },

  // ─── PostgreSQL Tables ───────────────────────────────────────────────────────
  {
    id: "de-db-001",
    question: "What are the main PostgreSQL tables in ShifterSimulator?",
    answer:
      "The main PostgreSQL tables are: inverter_data.inverter_reporting_data (half-hourly telemetry view — the source for the REST API), data_sources.tariff_info (tariff code registry), data_sources.carbon_intensity (carbon intensity forecast by region and datetime), data_sources.decent_solar_forecast (calibrated PV forecast by customer), data_sources.customer_charge_curve (fitted CC/CV battery charge models per customer).",
    category: "architecture",
    product: "shifter",
  },

  // ─── Key Numbers / Summary ───────────────────────────────────────────────────
  {
    id: "de-summary-001",
    question: "What are the key facts and numbers about ShifterSimulator?",
    answer:
      "Key facts: time resolution is 30-minute slots (48 per day); default optimisation weight is 80% price, 20% carbon (adjustable per customer); supported inverter brands are Solis, FoxESS, GivEnergy, SolarEdge, and Eleven; customer messaging is via WhatsApp using Twilio; primary database is PostgreSQL; schedule instructions are stored in MongoDB via the Shifter Service; error notifications go to Slack; error tracking uses Sentry.",
    category: "overview",
    product: "shifter",
  },
  {
    id: "de-summary-002",
    question: "What external APIs does ShifterSimulator consume?",
    answer:
      "ShifterSimulator integrates with these external APIs: Octopus Energy (tariff history, meter readings, Agile pricing), carbonintensity.org.uk (regional UK carbon intensity forecast), Solis / FoxESS / GivEnergy / SolarEdge / Eleven (live inverter data), Solcast (solar irradiance forecast), Accounts API — internal (customer and installation configuration), Shifter Service — internal (control-plane schedule storage), Twilio (WhatsApp messaging), Slack (operational alerts), HubSpot (CRM sync), Jira (ticket automation), SharePoint (document uploads).",
    category: "architecture",
    product: "shifter",
  },
];
