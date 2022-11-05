import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import unocss from "unocss/vite";
import solid from "vite-plugin-solid";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const config: UserConfig = {
  plugins: [unocss(), solid(), sveltekit(), vanillaExtractPlugin()],
};

export default config;
