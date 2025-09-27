import { NavLink, useLocation } from "react-router-dom";
import { User, Image, Mail, Home, Gamepad2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigationItems = [
  { 
    title: "Home", 
    url: "/", 
    icon: Home 
  },
  {
  title: "Game Design/Art",
  url: "/game-design",
  icon: Gamepad2
},
  { 
    title: "Portfolio", 
    url: "/portfolio", 
    icon: Image 
  },
  { 
    title: "Bio", 
    url: "/bio", 
    icon: User 
  },
  { 
    title: "Contact", 
    url: "/contact", 
    icon: Mail 
  },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className="w-64 border-r border-border">
      
      <SidebarContent className="p-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `gallery-nav flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}