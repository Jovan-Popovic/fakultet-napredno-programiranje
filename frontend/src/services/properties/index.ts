import type {
  GetCitiesResponseRecord,
  GetPaginatedPropertiesRequestRecord,
  GetPaginatedPropertiesResponseRecord,
  GetPlatformsResponseRecord,
  GetPropertyResponseRecord,
} from "./types";

import { callApi } from "@/api";
import { urlQueryManager } from "@/utils/url/query";

const { getQueryString } = urlQueryManager;

/**
 * Service type for interacting with Properties API endpoints.
 */
export type PropertiesServiceType = {
  /**
   * Retrieves pagination of properties with filters.
   *
   * @param {GetPaginatedPropertiesRequestRecord} data - Query parameters and filters for fetching properties.
   * @returns {Promise<GetPaginatedPropertiesResponseRecord>} A promise to the pagination of properties.
   */
  getPaginatedProperties(
    data: GetPaginatedPropertiesRequestRecord
  ): Promise<GetPaginatedPropertiesResponseRecord>;

  /**
   * Retrieves a property by its ID.
   *
   * @param {number} id - The ID of the property.
   * @returns {Promise<GetPropertyResponseRecord>} A promise to the property.
   */
  getProperty(id: number): Promise<GetPropertyResponseRecord>;

  /**
   * Retrieves all unique cities.
   *
   * @returns {Promise<GetCitiesResponseRecord>} A promise to the list of cities.
   */
  getCities(): Promise<GetCitiesResponseRecord>;

  /**
   * Retrieves all available platforms/sources.
   *
   * @returns {Promise<GetPlatformsResponseRecord>} A promise to the list of platforms.
   */
  getPlatforms(): Promise<GetPlatformsResponseRecord>;
};

class PropertiesService implements PropertiesServiceType {
  async getPaginatedProperties(
    data: GetPaginatedPropertiesRequestRecord
  ): Promise<GetPaginatedPropertiesResponseRecord> {
    return await callApi({
      url: `/properties${getQueryString(data)}`,
    });
  }

  async getProperty(id: number): Promise<GetPropertyResponseRecord> {
    return await callApi({
      url: `/properties/${id}`,
    });
  }

  async getCities(): Promise<GetCitiesResponseRecord> {
    return await callApi({
      url: `/properties/cities`,
    });
  }

  async getPlatforms(): Promise<GetPlatformsResponseRecord> {
    return await callApi({
      url: `/properties/platforms`,
    });
  }
}

export const propertiesService: PropertiesServiceType = new PropertiesService();
