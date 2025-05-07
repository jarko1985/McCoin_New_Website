"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import * as Switch from "@radix-ui/react-switch";
import { COOKIE_CATEGORIES } from "@/constants";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { Button } from "../ui/button";
import { GrLinkPrevious } from "react-icons/gr";
import { FaPlus, FaMinus } from "react-icons/fa6";

export const ManageCookiesModal = () => {
  const { consent, updateConsent, acceptAll, isInitialized } =
    useCookieConsent();

  if (!isInitialized) return null;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-sm text-white hover:underline underline mt-2 cursor-pointer">
          Manage cookies
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0 z-50" />
        <Dialog.Content className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md overflow-y-auto border-l border-gray-200 bg-[#07153b] p-6 shadow-xl sm:rounded-l-lg">
          <div className="flex gap-x-2 items-center mb-6">
            <Dialog.Close asChild>
              <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                <GrLinkPrevious className="h-5 w-5 text-white" />
              </button>
            </Dialog.Close>
            <Dialog.Title className="text-xl font-bold text-white">
              Manage Cookies
            </Dialog.Title>
          </div>

          <p className="mb-6 text-gray-200">
            You decide which cookies you want to activate or reject. We won't
            run any cookies without your consent.{" "}
            <a
              href="/privacy-policy"
              className="font-bold text-gray-200 hover:underline cursor-pointer"
            >
              Cookie policy
            </a>
          </p>

          <h2 className="font-bold mb-4 text-white">
            Manage your cookie preferences
          </h2>

          <Accordion.Root type="single" collapsible className="space-y-4">
            {COOKIE_CATEGORIES.map((category) => (
              <Accordion.Item
                key={category.id}
                value={category.id}
                className="border-b border-gray-200 pb-4 overflow-hidden"
              >
                <div className="flex justify-between items-center">
                  <Accordion.Trigger className="group flex-1 text-left font-medium hover:underline">
                    <div className="flex flex-row gap-1 text-white items-center relative">
                      {/* Plus icon with rotate and fade transition */}
                      <FaPlus className="text-white transition-all duration-200 transform group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-90" />
                      {/* Minus icon with fade transition */}
                      <FaMinus className="text-white absolute left-0 opacity-0 transition-all duration-200 group-data-[state=open]:opacity-100" />
                      {category.title}
                    </div>
                  </Accordion.Trigger>
                  {!category.required && (
                    <Switch.Root
                      checked={consent[category.id]}
                      onCheckedChange={(checked) =>
                        updateConsent(category.id, checked)
                      }
                      className="w-[42px] h-[25px] bg-gray-600 rounded-full relative data-[state=checked]:bg-green-600 outline-none"
                      disabled={category.required}
                    >
                      <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                    </Switch.Root>
                  )}
                  {category.required && (
                    <span className="text-sm text-green-500">
                      Always active
                    </span>
                  )}
                </div>

                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="pt-2 text-gray-100">
                    <ul className="list-disc pl-5 space-y-1">
                      {category.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-100 mb-4">
              Blocking these cookies and similar technologies does not generally
              affect the way our services work. Please note, however, that while
              you'll still see advertisements about Bitpanda on websites, the
              adverts will no longer be personalized.
            </p>

            <div className="flex justify-between gap-2">
              <Button
                onClick={acceptAll}
                variant="outline"
                className="bg-white text-[#07153b] hover:bg-green-500 px-4 py-2 rounded-md cursor-pointer"
              >
                Accept All
              </Button>
              <Dialog.Close asChild>
              <Button
                onClick={() =>
                  document.dispatchEvent(new Event("closeCookieModal"))
                }
                className="bg-white hover:bg-green-500 text-[#07153b] px-4 py-2 rounded-md cursor-pointer"
              >
                Confirm Preferences
              </Button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
