const tooltip = document.querySelector('.bento-tooltip')
const tooltipTitle = document.querySelector('.bento-tooltip-title')
const tooltipText = document.querySelector('.bento-tooltip-text')
const dismissBtn = document.querySelector('.tooltip-dismiss')
const header = document.querySelector('#website-header')

let tooltipVisible = true
let wasDismissed = false

const firstTimeHeader = "Wondering what a Bento is?"
const reentryHeader = "Welcome back to Bento mode."
  
const tips = [
    "A traditional Japanese lunchbox with neatly arranged compartments — just like how we serve your anime picks.",
    "Think of bento as an organized meal box. Here, it’s your personalized anime selection.",
    "Bento means balance and structure. That’s how we recommend anime to you.",
    "Each anime you choose fits into a bento-style layout — simple, neat, curated.",
    "This is your anime bento. Every pick, a tasty little mood.",
    "We serve anime the bento way: no mess, just the best.",
    "Neatly packed anime. Carefully portioned. Surprisingly addictive.",
    "Just like bento: pretty outside, solid content inside.",
    "A bento box = a perfect combo of flavors. Here, it's a perfect combo of anime.",
    "Call it a lunchbox if you want — but it's also your personalized anime tray.",
    "Organized anime recommendations. Clean like a bento. That’s the idea.",
    "Once a simple Japanese meal box. Now, your custom anime feast."
]

const animeBentoTips = [
    "Just like a bento box — your anime picks are neatly packed for max flavor.",
    "Bento doesn’t just mean neat. It means *crafted*. So are your anime picks.",
    "You pick the vibe. We box it up in bento form. Easy.",
    "Neatly arranged anime servings. One genre per compartment. Zero chaos.",
    "Like a bento box — small, powerful doses of anime joy.",
    "Every anime recommendation fits into your mood tray. Balanced and binge-ready.",
    "Bento isn’t just food. It’s a vibe — like your personal anime playlist.",
    "Your watchlist? Bento-fied. Balanced, portioned, and satisfying.",
    "Think of this as a lunchbox of stories. Each one a bite-sized adventure.",
    "Anime served like bento: compact, complete, and always aesthetic.",
    "We bento-wrap your taste into handpicked anime bundles.",
    "Your mood = our menu. Bento-style anime recs, no filler.",
]
function updateTooltipContent() {
  if (!tooltipTitle || !tooltipText) return
  const headerText = wasDismissed
    ? reentryHeader
    : firstTimeHeader

  const tip = wasDismissed
    ? animeBentoTips[Math.floor(Math.random() * animeBentoTips.length)]
    : tips[Math.floor(Math.random() * tips.length)]

  tooltipTitle.textContent = headerText
  tooltipText.textContent = tip
}

updateTooltipContent()

if (tooltip && header) {
  header.addEventListener('mouseenter', () => {
    if (tooltipVisible) {
      tooltip.style.opacity = 1
      tooltip.style.pointerEvents = 'auto'
    }
  })

  header.addEventListener('mouseleave', () => {
    if (tooltipVisible) {
      tooltip.style.opacity = 0
      tooltip.style.pointerEvents = 'none'
    }
  })

  header.addEventListener('click', () => {
    tooltipVisible = true
    updateTooltipContent()
    tooltip.style.opacity = 1
    tooltip.style.pointerEvents = 'auto'
  })
}

if (tooltip && dismissBtn) {
  dismissBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    tooltipVisible = false
    wasDismissed = true
    tooltip.style.opacity = 0
    tooltip.style.pointerEvents = 'none'
  })
}