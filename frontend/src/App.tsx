import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile }from "./pages/Profile";
import { Dashboard} from "./pages/Dashboard";
import {Chat} from "./pages/Chat";
import {DSA} from "./pages/DSA";
import {ProgrammingTutor} from "./pages/ProgrammingTutor";
import {RAG} from "./pages/RAG";
import {Quiz} from "./pages/Quiz";
import {CodeReview} from "./pages/CodeReview";
import {Progress} from "./pages/Progress";
import {Admin} from "./pages/Admin";
import {AlgorithmDetail} from "./components/algorithm/AlgorithmDetail";
import {ProtectedRoute} from "./components/auth/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              {/* Nested protected routes render inside AppLayout's <Outlet /> */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/dsa" element={<DSA />} />
              <Route path="/dsa/:algorithmId" element={<AlgorithmDetail />} />
              <Route path="/programming-tutor" element={<ProgrammingTutor />} />
              <Route path="/rag" element={<RAG />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/code-review" element={<CodeReview />} />
              <Route path="/progress" element={<Progress />} />

              {/* Admin still requires the ADMIN role */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Unknown URL */}
            <Route
              path="*"
              element={<Navigate to="/login" replace />}
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;