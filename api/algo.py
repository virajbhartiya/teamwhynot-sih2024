import math
import random  # Make sure to import at the top of your file


def regulated_crop_price(
    season, demand, supply, min_resale_value, max_resale_value, modal_resale_value
):
    # Calculate supply-demand ratio
    supply_demand_ratio = supply / demand

    # Enhanced seasonal factor (continuous sinusoidal variation)
    season_map = {"winter": 0, "spring": 1, "summer": 2, "autumn": 3}
    season_value = season_map.get(season.lower(), 0)
    seasonal_factor = 1 + 0.2 * math.sin(2 * math.pi * (season_value / 4))

    # Calculate price range and elasticity
    price_range = max_resale_value - min_resale_value
    price_elasticity = price_range / modal_resale_value

    # Calculate base price with enhanced seasonal influence
    base_price = modal_resale_value * (1 + (seasonal_factor - 1) * price_elasticity)

    # Enhanced supply-demand adjustment
    supply_demand_factor = math.atan(math.pi * (supply_demand_ratio - 1)) / math.pi
    supply_demand_adjustment = supply_demand_factor * price_range * 0.5

    # Calculate adjusted price
    adjusted_price = base_price - supply_demand_adjustment

    # Apply non-linear scaling based on min and max resale values
    price_position = (adjusted_price - min_resale_value) / price_range
    scaled_position = math.pow(price_position, 1.5)  # Non-linear scaling
    regulated_price = min_resale_value + scaled_position * price_range

    return regulated_price


price = regulated_crop_price("winter", 1500, 1000, 7600, 8765, 8325)
print(f"The regulated price is: {price:.2f}")
