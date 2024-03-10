"use client";

import {cardAPI} from "../controllers/api";
import {QueryKeys} from "@/configs/queryKeys";
import {useQuery} from "@tanstack/react-query";
import {IUserSession} from "@/modules/profile";

export function useGetCards(session: IUserSession) {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCards, session.cards],
    queryFn: () => cardAPI.getAll(session.cards, session.jwt),
  });
}