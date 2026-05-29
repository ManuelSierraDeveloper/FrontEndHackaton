import { api } from "@/lib/api-client";
import type {
  CreateProducerProfileRequest,
  ProducerProfileResponse,
  CreateFarmRequest,
  FarmResponse,
} from "@/types/api";

export const producerService = {
  createProfile: (data: CreateProducerProfileRequest, token: string) =>
    api.post<ProducerProfileResponse>("/producers/me", data, token),

  getProfile: (token: string) =>
    api.get<ProducerProfileResponse>("/producers/me", token),

  updateProfile: (data: Partial<CreateProducerProfileRequest>, token: string) =>
    api.patch<ProducerProfileResponse>("/producers/me", data, token),

  getPublicProfile: (producerId: string) =>
    api.get<ProducerProfileResponse>(`/public/producers/${producerId}`),

  createFarm: (data: CreateFarmRequest, token: string) =>
    api.post<FarmResponse>("/farms", data, token),

  getFarms: (token: string) =>
    api.get<FarmResponse[]>("/farms", token),

  getFarmById: (farmId: string, token: string) =>
    api.get<FarmResponse>(`/farms/${farmId}`, token),
};
