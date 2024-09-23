// "use client";

// import React from "react";
// import { ListFilter, MoreHorizontal } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Tabs, TabsContent } from "@/components/ui/tabs";
// import { useGetApprovalRequestsQuery } from "@/services/marketAnalysisAPI";

// export const description =
//   "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information.";

// export default function ApprovalRequests() {
//   // Fetch the data using your query hook
//   const { data: approvals, error, isLoading } = useGetApprovalRequestsQuery("");

//   // Loading state
//   if (isLoading) return <div>Loading...</div>;

//   // Error state
//   //   if (error) return <div>Error loading approval requests</div>;

//   return (
//     <div className="flex min-h-screen w-full flex-col bg-muted/40">
//       <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
//         <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
//           <Card x-chunk="dashboard-06-chunk-0">
//             <CardHeader>
//               <CardTitle>Approval List</CardTitle>
//               <CardDescription>
//                 View the combinations needed for approval.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Instrument Group</TableHead>
//                     <TableHead>Settlement CCY</TableHead>
//                     <TableHead>Trade CCY</TableHead>
//                     <TableHead className="hidden md:table-cell">
//                       Country Risk
//                     </TableHead>
//                     <TableHead className="hidden md:table-cell">
//                       Exchange
//                     </TableHead>
//                     <TableHead className="hidden md:table-cell"></TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {approvals && approvals.length > 0 ? (
//                     approvals.map((approval: any) => (
//                       <TableRow key={approval.id}>
//                         <TableCell className="font-medium">
//                           {approval.instrumentGroup}
//                         </TableCell>
//                         <TableCell>{approval.settlementCCY}</TableCell>
//                         <TableCell>{approval.tradeCCY}</TableCell>
//                         <TableCell>{approval.risk}</TableCell>
//                         <TableCell>{approval.exchange}</TableCell>
//                         <TableCell className="gap-2 flex">
//                           <Button>Approve</Button>
//                           <Button>Disapprove</Button>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell
//                         colSpan={4}
//                         className="text-center font-bold py-20"
//                       >
//                         No requests currently
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </main>
//       </div>
//     </div>
//   );
// }
