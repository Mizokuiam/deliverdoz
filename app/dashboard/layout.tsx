import { Metadata } from "next";
import { RoleSwitcher } from "@/components/dashboard/role-switcher";
import { UserNav } from "@/components/dashboard/user-nav";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard - DeliverDoz",
  description: "Manage your deliveries and travel plans",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <RoleSwitcher />
            <Tabs defaultValue="requests" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="requests" asChild>
                  <Link href="/dashboard">Requests</Link>
                </TabsTrigger>
                <TabsTrigger value="travels" asChild>
                  <Link href="/dashboard/travels">My Travels</Link>
                </TabsTrigger>
                <TabsTrigger value="settings" asChild>
                  <Link href="/dashboard/settings">Settings</Link>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
    </div>
  );
}