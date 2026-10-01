# Dark Patterns in Food Delivery Apps: Zomato × Swiggy

A survey-based study of how manipulative design ("dark patterns") on Zomato and Swiggy affects what people order and spend.

**Live site:** _add your GitHub Pages link here_

## Research question

Do dark patterns such as fake urgency timers, hidden checkout charges and pre-added cart items make users buy things they didn't plan to and spend more than they intended?

## Data

- **213 survey respondents**, all users of Zomato, Swiggy, or both
- Variables include age group, gender, income level, ordering frequency, exposure to six dark patterns, intended budget vs. actual spend, unplanned purchases, and awareness/protection intent
- A **manipulation score (0–42)** combines how often each respondent encountered the six patterns

The raw responses are not included in this repository to protect respondent privacy.

### Dark patterns studied

1. Fake urgency timers
2. Hidden charges at checkout
3. Pre-added items in cart
4. Hard-to-cancel subscriptions
5. Guilt-tripping decline buttons ("confirmshaming")
6. Misleading free delivery

## Methods

All analysis is in [`analysis/analysis.ipynb`](analysis/analysis.ipynb), using pandas, SciPy and scikit-learn:

- Point-biserial and Pearson correlations
- Chi-square test of independence
- Independent t-test and one-way ANOVA
- Logistic regression with 5-fold cross-validation
- K-means clustering to build user risk profiles

## Key findings

| Test | Result |
|---|---|
| Manipulation score vs. unplanned purchases | r = 0.379, p < 0.001 |
| Manipulation score vs. % overspend | r = 0.215, p = 0.002 |
| Manipulation score vs. raw extra spend | r = 0.098, p = 0.156 (not significant) |
| Zomato vs. Swiggy manipulation score | 17.55 vs. 20.22, t = −2.25, p = 0.026 |
| Extra spend across apps (ANOVA) | F = 0.15, p = 0.861 (not significant) |
| Awareness × income (chi-square) | χ² = 13.28, df = 6, p = 0.039 |
| Logistic regression (predicting unplanned purchases) | 61.5% ± 6.1% accuracy (5-fold CV) |

On average, respondents scored 18.7/42 on manipulation exposure and spent ₹169 (about 69%) more than they intended.

K-means clustering found three user types:

| Cluster | n | Avg manipulation score | Avg extra spend |
|---|---|---|---|
| Easy Target (high risk) | 64 | 21.6 | ₹221 |
| Aware but Affected (medium risk) | 82 | 20.2 | ₹121 |
| Immune User (low risk) | 67 | 10.2 | ₹131 |

## Website

`index.html` is a self-contained React page (no build step) with four tabs: Overview, Dataset, Findings and a Risk Predictor. It can be opened directly in a browser or hosted on any static host.

**Note:** the individual rows and distribution charts on the Dataset tab are simulated to match the survey's structure, so no real responses are exposed. The results under Findings come from the actual analysis.

The readable source for the page is in [`src/`](src/).

## Project structure

```
├── index.html          # the website (self-contained)
├── src/                # React components, styles and data used in index.html
└── analysis/
    └── analysis.ipynb  # full statistical analysis
```
