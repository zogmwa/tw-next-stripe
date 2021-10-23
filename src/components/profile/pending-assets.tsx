import React, { useMemo } from 'react'
import { ProfileAsset } from '../profile-asset'
import { Profile } from '../../types/profile'
import { Asset } from '../../types/asset'

export const PendingAssetsProfile = ({ data }: { data: Profile }) => {
  const pendingAssets: Asset[] = useMemo(() => {
    return data?.submitted_assets?.filter((asset) => (data.pending_asset_ids ?? []).includes(asset.id) ?? [])
  }, [data])
  return (
    <div id="pending-assets" className="mb-8">
      <div className="hidden mb-2 md:flex">
        <p className="text-base font-bold">Pending Assets</p>
        <span className="ml-auto">{`${pendingAssets.length} Product(s)`}</span>
      </div>
      <div className="border border-gray-200 divide-y divide-gray-200 rounded-md">
        {pendingAssets.map((asset) => (
          <ProfileAsset asset={asset} key={asset.id} />
        ))}
      </div>
    </div>
  )
}
