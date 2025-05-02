import Botpoison from "@botpoison/browser";
import type { Country, PublicKeyType } from "../types/outer-layout";
import { getPublicKey } from "./getPublicKey";
import { getCountryFromDomain } from "./getCountryFromDomain";

const country: Country = getCountryFromDomain();

export const getBotPoison = async (type: PublicKeyType) => {
  const publicKey = getPublicKey(country, type);

  const botpoison = new Botpoison({
    publicKey: publicKey,
  });

  const { solution } = await botpoison.challenge();
  return solution;
};
