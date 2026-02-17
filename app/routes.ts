import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("login", "routes/login.tsx"),
  route("ui-kit-docs", "routes/ui-kit-docs.tsx"),
] satisfies RouteConfig;
