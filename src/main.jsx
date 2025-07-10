import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/router.jsx'
import BackToTop from './Component/BackToTop/BackToTop.jsx'
import AuthProvider from './Providers/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </Elements>
    <BackToTop></BackToTop>
  </StrictMode>,
)
