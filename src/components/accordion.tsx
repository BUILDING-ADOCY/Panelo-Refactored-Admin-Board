"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "group border-t border-b border-neutral-200 first:border-t-0 dark:border-neutral-800",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

// Fixed type definition with proper data-state typing
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    'data-state'?: 'open' | 'closed';
  }
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between gap-4 py-5 px-5",
        "text-left text-lg font-semibold text-neutral-900 transition-colors",
        "hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400",
        "dark:text-neutral-100 dark:hover:bg-neutral-800 dark:focus-visible:ring-neutral-600",
        className
      )}
      {...props}
    >
      {children}
      <motion.div
        initial={false}
        animate={{ rotate: props['data-state'] === 'open' ? 180 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="shrink-0"
      >
        <FiChevronDown className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
      </motion.div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn("overflow-hidden", className)}
    {...props}
  >
    <motion.div
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: { height: "auto", opacity: 1 },
        collapsed: { height: 0, opacity: 0 }
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pb-5 pl-5 pr-16 text-base font-normal text-neutral-600 dark:text-neutral-400">
        {children}
      </div>
    </motion.div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };