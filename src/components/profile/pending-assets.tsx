import React, { useMemo } from 'react'
import { Profile } from '@taggedweb/types/profile'
import { Asset } from '@taggedweb/types/asset'
import { ProfileAsset } from '../profile-asset'

export const PendingAssetsProfile = ({ data }: { data: Profile }) => {
  const pendingAssets: Asset[] = useMemo(() => {
    return data?.submitted_assets?.filter((asset) => (data.pending_asset_ids ?? []).includes(asset.id) ?? []) ?? []
  }, [data])

  return (
    <div id="pending-assets" className="mb-8">
      <div className="flex mb-2">
        <p className="text-sm font-bold sm:text-base">Pending Web Services</p>
        <span className="ml-auto text-sm sm:text-base">{`${pendingAssets?.length ?? 0} Product(s)`}</span>
      </div>
      <div className="border border-gray-200 divide-y divide-gray-200 rounded-md">
        {pendingAssets.map((asset) => (
          <ProfileAsset asset={asset} key={asset.id} />
        ))}
      </div>
    </div>
  )
}
