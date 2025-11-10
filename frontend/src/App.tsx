import { AppRoutes } from "./routes/AppRoutes";
import { ShellLayout } from "./layout/ShellLayout";

export default function App() {
  return (
    <ShellLayout>
      <AppRoutes />
    </ShellLayout>
  );
}

