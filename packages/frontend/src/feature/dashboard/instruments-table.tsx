import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useGetAllValuesQuery,
  usePostTradeMutation,
} from "@/services/marketAnalysisAPI";

// Define the form schema with zod
const formSchema = z.object({
  instrumentGroup: z
    .string()
    .min(1, { message: "Instrument Group is required" }),
  tradeAmount: z
    .number()
    .min(1, { message: "Trade Amount must be greater than 0" }),
});

// Type for form data based on schema
type FormData = z.infer<typeof formSchema>;

export const description =
  "A products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

export default function DashboardTable() {
  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tradeAmount: 0,
    },
  });

  // Fetch data and mutation hooks
  const {
    data: AllQueries,
    isLoading,
    isError,
    error,
  } = useGetAllValuesQuery("");

  const [
    tradeAmount,
    { isLoading: isTrading, isError: isTradeError, error: tradeError },
  ] = usePostTradeMutation();

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (formData) => {
    try {
      tradeAmount(formData);
      console.log("Trade submitted successfully");
    } catch (err) {
      console.error("Error submitting trade:", err);
    }
  };

  // Loading and error handling
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data: {error?.message}</p>;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                View real-time changes in limits of assets.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Instrument</TableHead>
                    <TableHead>Counter Party</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Available Limits
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Trade Amount
                    </TableHead>
                    <TableHead className="hidden md:table-cell" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {AllQueries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No requests currently
                      </TableCell>
                    </TableRow>
                  ) : (
                    AllQueries.map((request) => (
                      <TableRow key={request}>
                        {/* <TableCell className="font-medium">
                          {request.instrument}
                        </TableCell> */}
                        <TableCell>{request.counterparty}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          ${request.available_limit}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <form
                            onSubmit={handleSubmit((data) =>
                              onSubmit({
                                ...data,
                                instrumentGroup: request.instrument,
                              }),
                            )}
                          >
                            <Input
                              {...register("tradeAmount")}
                              type="number"
                              placeholder="Enter trade amount"
                              required
                            />
                            {errors.tradeAmount && (
                              <p>{errors.tradeAmount.message}</p>
                            )}
                            <Button type="submit" className="ml-2">
                              Trade
                            </Button>
                          </form>
                        </TableCell>
                        <TableCell className="hidden md:table-cell" />
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
