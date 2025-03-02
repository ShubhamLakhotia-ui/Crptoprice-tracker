---
title: Challenges & Solutions
sidebar_position: 4
---

# Challenges & Solutions

During the development of **Crypto Price Tracker**, we encountered several technical challenges. Here’s how we identified and resolved them.

---

## **API Rate Limits & Switching from CoinGecko to CoinCap**

### **Issue:**

- Initially, we used the **CoinGecko API** to fetch live cryptocurrency prices.
- However, **CoinGecko has strict rate limits**, especially for free-tier users.
- After a few API requests, we **exceeded the limit**, causing API failures and missing data.

### **Solution:**

- **Switched to CoinCap API**, which provides **more flexible rate limits**.
- Updated API endpoints to:
  ```sh
  https://api.coincap.io/v2/assets
  ```

### **Issue:**

- Initially, we made **frequent API calls** to fetch live cryptocurrency prices.
- The **CoinCap API** has rate limits, and too many requests caused the API to **temporarily block responses**.
- This resulted in **users getting errors** when clicking the refresh button too often.

### **Solution:**

- **Implemented Manual Refresh Button:** Instead of automatically calling the API every few seconds, we **allowed users to refresh prices manually**.
- **Used State Management to Cache Data:** We stored API responses in **Context API**, so that data could be used across components **without re-fetching unnecessarily**.
- **Added Error Handling:** If the API failed, we displayed an **error message** instead of breaking the UI.

## **State Management Complexity**

### **Issue:**

- Initially used **React Query**, but it was overkill for this project.

### **Solution:**

- Switched to **Context API**, which was lightweight and easy to maintain.

---

```tsx
if (errorMessage) {
  return (
    <p className="text-red-500 text-lg">
      API is currently unavailable. Try again later.
    </p>
  );
}
```
