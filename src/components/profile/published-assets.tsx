import React, { useMemo } from 'react'
import { Profile } from '@taggedweb/types/profile'
import { Asset } from '@taggedweb/types/asset'
import { ProfileAsset } from '../profile-asset'

export const PublishedAssetsProfile = ({ data }: { data: Profile }) => {
  const publishedAssets: Asset[] = useMemo(() => {
    return data?.submitted_assets?.filter((asset) => !(data.pending_asset_ids ?? []).includes(asset.id) ?? []) ?? []
  }, [data])

  return (
    <div id="published-assets" className="mb-8">
      <div className="mb-2 md:flex">
        <p className="text-base font-bold">Published Web Services</p>
        <span className="ml-auto">{`${publishedAssets?.length ?? 0} Product(s)`}</span>
      </div>
      <div className="border border-gray-200 divide-y divide-gray-200 rounded-md">
        {publishedAssets.map((asset) => (
          <ProfileAsset asset={asset} key={asset.id} />
        ))}
      </div>
    </div>
  )
}
