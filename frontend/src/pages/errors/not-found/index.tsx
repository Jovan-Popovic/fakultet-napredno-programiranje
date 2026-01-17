import { type NotFoundRouteProps } from "@tanstack/react-router";
import type { FC } from "react";

import { DotsBackground } from "@/components/ui/backgrounds/dots";
import { Paragraph } from "@/components/ui/typography/paragraph";
import { Title } from "@/components/ui/typography/title";

type Props = NotFoundRouteProps;

export const NotFound: FC<Props> = () => {
  return (
    <DotsBackground
      count={60}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800"
      padContent={false}
    >
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="w-full max-w-4xl text-center">
          <div className="mb-6 sm:mb-8">
            <Title
              level={1}
              className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-[8rem] leading-none font-bold text-transparent sm:text-[12rem] md:text-[14rem] lg:text-[16rem]"
            >
              404
            </Title>
          </div>
          <div className="mb-6 space-y-3 px-2 sm:mb-8 sm:space-y-4 sm:px-0">
            <Title
              level={2}
              className="mb-2 text-xl font-semibold text-white sm:mb-4 sm:text-2xl md:text-3xl"
            >
              This spaceship is empty
            </Title>
            <Paragraph className="mx-auto max-w-2xl px-2 text-base text-slate-300 sm:px-0 sm:text-lg">
              The page you are looking for does not exist.
            </Paragraph>
          </div>
        </div>
      </div>
    </DotsBackground>
  );
};
