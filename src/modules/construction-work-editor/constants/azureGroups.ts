import {Environment} from '@/environment'

export enum AzureGroup {
  admin = 'admin',
  editor = 'editor', // redacteur
  publisher = 'publisher', // omgevingsmanager / communicatieadviseur
}

/**
 * Azure Entra ID group IDs for each environment
 */
export const azureGroups = {
  [AzureGroup.admin]: {
    [Environment.custom]: '8394d4d0-d326-4749-861c-d8c56815f13d',
    [Environment.development]: '8394d4d0-d326-4749-861c-d8c56815f13d',
    [Environment.test]: '1413ee8e-3fa5-4eda-8a59-b7e393b9561b',
    [Environment.acceptance]: 'c5b8c56a-e9f0-4069-a8cd-0ba58e29f620',
    [Environment.production]: 'd51c6a44-9684-420b-b3be-3d5c90daddc5',
  },
  [AzureGroup.editor]: {
    [Environment.custom]: 'b02f476b-6f1d-4f9e-86e6-5a935310050b',
    [Environment.development]: 'b02f476b-6f1d-4f9e-86e6-5a935310050b',
    [Environment.test]: '4ca0fd55-62b7-4d2b-a1da-1999045eb1c9',
    [Environment.acceptance]: '3a7d61fa-e932-4e0f-baa5-b7d9dcd6edd9',
    [Environment.production]: '4ca0fd55-62b7-4d2b-a1da-1999045eb1c9',
  },
  [AzureGroup.publisher]: {
    [Environment.custom]: '0e7307de-7da8-4124-8e33-f8a0e7901d37',
    [Environment.development]: '0e7307de-7da8-4124-8e33-f8a0e7901d37',
    [Environment.test]: 'd08e2387-d6e0-48f8-a900-21d94e65ca18',
    [Environment.acceptance]: 'ebf967d8-3048-4fa7-a98d-bc73a259120d',
    [Environment.production]: '7741a99c-8bd9-4cdc-b73f-0775b766cc19',
  },
}
