"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { setUserInfo, UserRole } from "@/lib/redux/userInfoSlice";

import { useGetFacetedValuesQuery } from "@/services/marketAnalysisAPI";

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'.";

export default function LoginForm() {
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("BAR");
  const [role, setRole] = useState(UserRole.trader);
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("department:", department);
    console.log("role:", role);
    if (!department || !role) {
      toast.error("Please select a department and role");
      return;
    }
    dispatch(
      setUserInfo({
        userDepartment: department,
        userRole: role,
      }),
    );
    router.push("/market-analysis/discoverability");
  };

  const { data, isLoading, isError } = useGetFacetedValuesQuery("department");

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <main className="flex pt-10 items-center justify-center">
      <div className="relative flex items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your role and department to login
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  onValueChange={(dept) => setDepartment(dept)}
                  defaultValue="BAR"
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select an department Group" />
                  </SelectTrigger>
                  <SelectContent>
                    {data!.result?.map((dept) => (
                      <SelectItem key={dept} className="" value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">role</Label>
                <Select
                  onValueChange={(val) => setRole(val as UserRole)}
                  defaultValue={UserRole.trader}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select an Instrument Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      key={UserRole.trader}
                      className=""
                      value={UserRole.trader}
                    >
                      Trader
                    </SelectItem>
                    <SelectItem
                      key={UserRole.approvalTeam}
                      className=""
                      value={UserRole.approvalTeam}
                    >
                      Approval Team
                    </SelectItem>
                    <SelectItem
                      key={UserRole.riskManagementTeam}
                      className=""
                      value={UserRole.riskManagementTeam}
                    >
                      Risk Management Team
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
