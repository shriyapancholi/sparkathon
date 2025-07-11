// UI Utilities and Common Functions for EcoPoints App

// Confetti animation function
function showConfetti() {
  // Create confetti container
  const confettiContainer = document.createElement("div")
  confettiContainer.style.position = "fixed"
  confettiContainer.style.top = "0"
  confettiContainer.style.left = "0"
  confettiContainer.style.width = "100%"
  confettiContainer.style.height = "100%"
  confettiContainer.style.pointerEvents = "none"
  confettiContainer.style.zIndex = "9999"
  document.body.appendChild(confettiContainer)

  // Create confetti pieces
  for (let i = 0; i < 50; i++) {
    createConfettiPiece(confettiContainer)
  }

  // Remove confetti after animation
  setTimeout(() => {
    document.body.removeChild(confettiContainer)
  }, 3000)
}

function createConfettiPiece(container) {
  const confetti = document.createElement("div")
  const colors = ["#3BB273", "#97BC62", "#2C5F2D", "#FFD700", "#FF6B6B"]
  const shapes = ["🌱", "🌿", "♻️", "🌍", "⭐", "🎉"]

  confetti.innerHTML = shapes[Math.floor(Math.random() * shapes.length)]
  confetti.style.position = "absolute"
  confetti.style.left = Math.random() * 100 + "%"
  confetti.style.top = "-10px"
  confetti.style.fontSize = Math.random() * 20 + 15 + "px"
  confetti.style.color = colors[Math.floor(Math.random() * colors.length)]
  confetti.style.userSelect = "none"
  confetti.style.pointerEvents = "none"

  container.appendChild(confetti)

  // Animate confetti falling
  const fallDuration = Math.random() * 2000 + 2000 // 2-4 seconds
  const horizontalMovement = (Math.random() - 0.5) * 200 // -100 to 100px

  confetti.animate(
    [
      {
        transform: "translateY(0px) translateX(0px) rotate(0deg)",
        opacity: 1,
      },
      {
        transform: `translateY(${window.innerHeight + 100}px) translateX(${horizontalMovement}px) rotate(360deg)`,
        opacity: 0,
      },
    ],
    {
      duration: fallDuration,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },
  )
}

// Wallet/Points update animation
function animatePointsUpdate(element, newValue, duration = 1000) {
  const startValue = Number.parseInt(element.textContent.replace(/[^\d]/g, "")) || 0
  const endValue = newValue
  const startTime = Date.now()

  function updateValue() {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart)

    element.textContent = currentValue.toLocaleString()

    if (progress < 1) {
      requestAnimationFrame(updateValue)
    }
  }

  updateValue()
}

// Toast notification system
function showToast(message, type = "success", duration = 3000) {
  const toast = document.createElement("div")
  toast.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white font-semibold transform transition-all duration-300 translate-x-full`

  // Set toast color based on type
  switch (type) {
    case "success":
      toast.classList.add("bg-success")
      break
    case "error":
      toast.classList.add("bg-danger")
      break
    case "warning":
      toast.classList.add("bg-yellow-500")
      break
    default:
      toast.classList.add("bg-primary")
  }

  toast.textContent = message
  document.body.appendChild(toast)

  // Animate in
  setTimeout(() => {
    toast.classList.remove("translate-x-full")
  }, 100)

  // Animate out and remove
  setTimeout(() => {
    toast.classList.add("translate-x-full")
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast)
      }
    }, 300)
  }, duration)
}

// Local storage helpers
const StorageHelper = {
  // Get user data
  getUser: () => {
    try {
      return JSON.parse(localStorage.getItem("ecoPointsUser") || "{}")
    } catch (e) {
      console.error("Error parsing user data:", e)
      return {}
    }
  },

  // Save user data
  saveUser: (userData) => {
    try {
      localStorage.setItem("ecoPointsUser", JSON.stringify(userData))
      return true
    } catch (e) {
      console.error("Error saving user data:", e)
      return false
    }
  },

  // Add transaction
  addTransaction: (transaction) => {
    const userData = StorageHelper.getUser()
    userData.transactions = userData.transactions || []
    userData.transactions.unshift(transaction)

    // Keep only last 50 transactions
    if (userData.transactions.length > 50) {
      userData.transactions = userData.transactions.slice(0, 50)
    }

    return StorageHelper.saveUser(userData)
  },

  // Update points
  updatePoints: (newPoints) => {
    const userData = StorageHelper.getUser()
    userData.points = newPoints
    return StorageHelper.saveUser(userData)
  },
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`

  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Generate random eco-friendly product names
function getRandomEcoProduct() {
  const products = [
    "Organic Vegetables",
    "Bamboo Toothbrush",
    "Reusable Water Bottle",
    "Eco-friendly Detergent",
    "Solar Power Bank",
    "Biodegradable Plates",
    "Organic Cotton Bag",
    "LED Bulbs",
    "Compost Bin",
    "Natural Soap",
    "Recycled Paper",
    "Plant-based Milk",
    "Organic Fruits",
    "Eco Cleaning Supplies",
  ]
  return products[Math.floor(Math.random() * products.length)]
}

// Calculate badge based on points
function getBadgeInfo(points) {
  if (points >= 5000) return { name: "Planet Savior", icon: "👑", color: "text-yellow-500" }
  if (points >= 2000) return { name: "Eco Champion", icon: "🏆", color: "text-yellow-600" }
  if (points >= 500) return { name: "Green Warrior", icon: "🌿", color: "text-green-600" }
  if (points >= 100) return { name: "Eco Starter", icon: "🌱", color: "text-green-500" }
  return { name: "New Member", icon: "🌟", color: "text-gray-500" }
}

// Mobile menu toggle
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }
}

// Initialize common UI elements
document.addEventListener("DOMContentLoaded", () => {
  initializeMobileMenu()

  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

// Export functions for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    showConfetti,
    animatePointsUpdate,
    showToast,
    StorageHelper,
    formatCurrency,
    formatDate,
    getRandomEcoProduct,
    getBadgeInfo,
  }
}
