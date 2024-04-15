"use client";

import React, { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { useUnit } from "effector-react";

import { $isTimelineModalOpen, $timelineModalData, setTimelineModalClose } from "organisms/timeline-modal/model";

import { ImageWithDomain } from "shared/ui/image-with-domain";

function getDate(value: Date) {
  return new Intl.DateTimeFormat("ru", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
}

export const TimelineModal = () => {
  const [isOpen, close, data] = useUnit([$isTimelineModalOpen, setTimelineModalClose, $timelineModalData]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-blue-900 p-6 text-left align-middle shadow-xl transition-all lg:max-w-lg">
                {data.image && (
                  <ImageWithDomain
                    className="mb-4 rounded-2xl md:mb-8"
                    src={data.image.url}
                    width={data.image.width}
                    height={data.image.height}
                    alt={data.image.name}
                  />
                )}
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
                  {data.title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-xs text-white/70 md:text-sm">
                    {getDate(data.start)} - {getDate(data.end)}
                  </p>
                </div>

                <div className="mt-2">
                  <a className="link text-white/50" href={data.link} target={"_blank"} rel={"nofollow"}>
                    {data.link}
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
