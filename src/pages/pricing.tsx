import React from "react";

// TypeScript interfaces
interface PricingFeature {
    text: string;
    included: boolean;
}

interface PricingPlan {
    name: string;
    price: string;
    pricePeriod: string | null;
    description: string;
    features: PricingFeature[];
    buttonText: string;
    isPopular: boolean;
}

interface PricingCardProps {
    plan: PricingPlan;
}

// SVG Icon for included features
const CheckIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-3 flex-shrink-0"
        viewBox="0 0 20 20"
        fill="currentColor"
        style={{ color: "var(--color-primary)" }}
    >
        <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
        />
    </svg>
);

// SVG Icon for excluded features
const TimesIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-3 flex-shrink-0"
        viewBox="0 0 20 20"
        fill="currentColor"
        style={{ color: "var(--color-muted-foreground)" }}
    >
        <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
        />
    </svg>
);

// Data for pricing plans
const pricingPlans: PricingPlan[] = [
    {
        name: "Free",
        price: "$0",
        pricePeriod: "/month",
        description: "Perfect for exploring and trying components.",
        features: [
            { text: "Download up to 10 components/day", included: true },
            { text: "Access to basic templates", included: true },
            { text: "Team collaboration", included: false },
            { text: "Priority support", included: false },
        ],
        buttonText: "Get Started",
        isPopular: false,
    },
    {
        name: "Premium",
        price: "$49",
        pricePeriod: "/month",
        description: "For designers and small teams who need more power.",
        features: [
            { text: "Unlimited component downloads", included: true },
            { text: "Access to all templates", included: true },
            { text: "Up to 3 devices login", included: true },
            { text: "Team collaboration", included: true },
            { text: "Priority support", included: true },
        ],
        buttonText: "Start Free Trial",
        isPopular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        pricePeriod: null,
        description: "For large teams with custom needs.",
        features: [
            { text: "Custom number of users", included: true },
            { text: "Unlimited downloads", included: true },
            { text: "Advanced collaboration tools", included: true },
            { text: "Dedicated account manager", included: true },
            { text: "24/7 dedicated support", included: true },
        ],
        buttonText: "Contact Sales",
        isPopular: false,
    },
];

// Individual Pricing Card Component
const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
    const cardClasses = `
    pricing-card
    bg-[var(--color-muted-background)] backdrop-blur-xl
    border rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-300
    hover:-translate-y-1 hover:shadow-xl
    ${plan.isPopular
            ? "border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)/20]"
            : "border-[var(--color-muted-foreground)] hover:border-[var(--color-primary)]"
        }
  `;

    const buttonClasses = `
    w-full py-3 px-6 rounded-lg font-medium mt-auto transition-all duration-300
    border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2
    ${plan.isPopular
            ? "bg-[var(--color-primary)] text-[var(--color-background)] shadow-lg shadow-[var(--color-primary)/30] hover:brightness-110 focus:ring-[var(--color-primary)]"
            : "bg-[var(--color-background)]/70 text-[var(--color-foreground)] border border-[var(--color-muted-foreground)] hover:brightness-105 focus:ring-[var(--color-primary)]"
        }
  `;

    return (
        <div className={cardClasses}>
            {plan.isPopular && (
                <div className="absolute top-0 right-4 -mt-3 bg-[var(--color-primary)] text-[var(--color-background)] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    MOST POPULAR
                </div>
            )}
            <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">
                {plan.name}
            </h3>
            <p className="text-[var(--color-foreground)] text-4xl font-bold mb-2">
                {plan.price}
                {plan.pricePeriod && (
                    <span className="text-lg text-[var(--color-muted-foreground)] font-medium">
                        {plan.pricePeriod}
                    </span>
                )}
            </p>
            <p className="text-[var(--color-muted-foreground)] mb-8 text-sm h-10">
                {plan.description}
            </p>
            <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                    <li
                        key={index}
                        className={`flex items-center ${feature.included
                                ? "text-[var(--color-foreground)]"
                                : "text-[var(--color-muted-foreground)]"
                            }`}
                    >
                        {feature.included ? <CheckIcon /> : <TimesIcon />}
                        <span>{feature.text}</span>
                    </li>
                ))}
            </ul>
            <button className={buttonClasses}>{plan.buttonText}</button>
        </div>
    );
};

// Main Pricing Section Component
const PricingSection: React.FC = () => {
    return (
        <section
            id="pricing"
            className="relative py-16 sm:py-24 overflow-hidden bg-[var(--color-background)]"
        >
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(111,0,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(111,0,255,0.1) 0%, transparent 50%)
            `,
                    }}
                />
            </div>

            <div className="relative container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-foreground)] mb-6 tracking-tight">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg md:text-xl text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
                        Choose the plan that works best for your team. No hidden fees, no
                        surprises. Start with a free trial and scale as you grow.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard key={index} plan={plan} />
                    ))}
                </div>

                {/* Additional info section */}
                <div className="text-center mt-16 max-w-3xl mx-auto">
                    <p className="text-sm text-[var(--color-muted-foreground)] mb-4">
                        All plans include a 14-day free trial. No credit card required.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--color-muted-foreground)]">
                        <span className="flex items-center">
                            <CheckIcon />
                            Cancel anytime
                        </span>
                        <span className="flex items-center">
                            <CheckIcon />
                            24/7 support
                        </span>
                        <span className="flex items-center">
                            <CheckIcon />
                            99.9% uptime SLA
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function PricingPage() {
    return <PricingSection />;
}
