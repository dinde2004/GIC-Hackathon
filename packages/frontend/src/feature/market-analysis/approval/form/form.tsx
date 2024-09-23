import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  ApprovalFormRequest,
  BaseInstrument,
} from "../../types/instruments.types";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { usePostApprovalFormMutation } from "@/services/marketAnalysisAPI";
import { toast } from "sonner";

export function ApprovalForm() {
  // Uncomment the next line when using actual search params
  const params = useSearchParams();
  //   const params = new URLSearchParams(
  //     "settlementCCY=USD&tradeCCY=USD&instrumentGroup=Derivatives",
  //   );

  const possibleInstrumentGroup = params.get("instrument_group") || "";
  const possibleSettlementCCY = params.get("settlement_ccy") || "";
  const possibleTradeCCY = params.get("trade_ccy") || "";
  const possibleRisk = params.get("risk_country") || "";
  const possibleExchange = params.get("exchange") || "";

  const formSchema = z.object({
    instrumentGroup: z.string().min(1, {
      message: "Instrument group must be at least 1 character.",
    }),
    settlementCCY: z.string().length(3, {
      message: "Settlement Currency must be exactly 3 characters.",
    }),
    tradeCCY: z.string().length(3, {
      message: "Trade Currency must be exactly 3 characters.",
    }),
    risk: z.string().min(1, {
      message: "Risk must be at least 1 character.",
    }),
    exchange: z.string().min(1, {
      message: "Exchange must be at least 1 character.",
    }),
  });

  const form = useForm<BaseInstrument>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      instrumentGroup: possibleInstrumentGroup,
      settlementCCY: possibleSettlementCCY,
      tradeCCY: possibleTradeCCY,
      risk: possibleRisk,
      exchange: possibleExchange,
    },
  });

  const [postApprovalForm, { isLoading, isError, isSuccess, error }] =
    usePostApprovalFormMutation();
  //   console.log(results);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Form submitted successfully");
    } else if (isError) {
      toast.error("unexpected error");
    }
  }, [isError, isSuccess, error]);

  const onSubmit: SubmitHandler<BaseInstrument> = (values) => {
    console.log("Form values before submission:", values); // Log form values
    postApprovalForm(values);

    // try {
    // Use the mutation hook to post the data
    //   console.log("Mutation response:", response); // Log response from mutation
    //   if (result.isSuccess) {
    //     toast.success("Form submitted successfully");
    //     console.log("Form submitted successfully");
    //     router.push("/market-analysis/discoverability");
    //   }else if(result.isError){

    //   }
    // } catch (err) {
    //   console.error("Error submitting form:", err);
    //   toast.error("Form submitted unsuccessfully, please try again");
    // }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="instrumentGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instrument Group:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter an Instrument Group"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="settlementCCY"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Settlement CCY:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter a Settlement CCY"
                    autoCapitalize="characters"
                    minLength={3}
                    maxLength={3}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tradeCCY"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trade CCY:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter a Trade CCY"
                    autoCapitalize="characters"
                    minLength={3}
                    maxLength={3}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="risk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk Country:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter a Risk Country"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="exchange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exchange:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter an Exchange" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {/* {isLoading ? "Submitting..." : "Submit"} */}
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
