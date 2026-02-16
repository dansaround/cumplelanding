'use client'

import Image from 'next/image'
import { useAtom } from 'jotai'
import { Text, PopUp, Accordion } from '@/components/ui'
import { selectedBrandAtom, categories } from '@/data/brands'
import { CategoryIcon } from './CategoryIcon'

export const BrandDetailPopUp = () => {
  const [selectedBrand, setSelectedBrand] = useAtom(selectedBrandAtom)

  if (!selectedBrand) return null

  const categoryConfig = categories[selectedBrand.category]

  return (
    <PopUp
      isOpen={!!selectedBrand}
      onClose={() => setSelectedBrand(null)}
      title={selectedBrand.brandName}
    >
      <div className="space-y-5">
        {/* Brand hero image */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden">
          <Image
            src={selectedBrand.image}
            alt={selectedBrand.brandName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 480px"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
            aria-hidden="true"
          />
        </div>

        {/* Category badge */}
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${categoryConfig.color}`}
            aria-hidden="true"
          >
            <CategoryIcon icon={categoryConfig.icon} className="w-4 h-4 text-dark" />
          </div>
          <Text.Regular size="sm" color="gray">
            {selectedBrand.category}
          </Text.Regular>
        </div>

        {/* Coverage */}
        <div>
          <Text.SemiBold size="sm" color="dark" as="h4" className="dark:text-white mb-1">
            Cobertura
          </Text.SemiBold>
          <Text.Regular size="sm" color="gray" as="p">
            {selectedBrand.coverage}
          </Text.Regular>
        </div>

        {/* Stores */}
        <div>
          <Text.SemiBold size="sm" color="dark" as="h4" className="dark:text-white mb-1">
            Tiendas
          </Text.SemiBold>
          <Text.Regular size="sm" color="gray" as="p">
            {selectedBrand.stores}
          </Text.Regular>
        </div>

        {/* Full benefit description */}
        <div>
          <Text.SemiBold size="sm" color="dark" as="h4" className="dark:text-white mb-1">
            Beneficios
          </Text.SemiBold>
          <Text.Regular size="sm" color="gray" as="p">
            {selectedBrand.benefitFull}
          </Text.Regular>
        </div>

        {/* Requirements */}
        <div>
          <Text.SemiBold size="sm" color="dark" as="h4" className="dark:text-white mb-1">
            Requisitos
          </Text.SemiBold>
          <Text.Regular size="sm" color="gray" as="p">
            {selectedBrand.requirements}
          </Text.Regular>
        </div>

        {/* Ages + Client Type side by side */}
        <div className="flex gap-4">
          <div className="flex-1">
            <Text.SemiBold size="sm" color="dark" as="h4" className="dark:text-white mb-1">
              Edades
            </Text.SemiBold>
            <Text.Regular size="sm" color="gray" as="p">
              {selectedBrand.ages}
            </Text.Regular>
          </div>
          <div className="flex-1">
            <Text.SemiBold size="sm" color="dark" as="h4" className="dark:text-white mb-1">
              Tipo de Cliente
            </Text.SemiBold>
            <Text.Regular size="sm" color="gray" as="p">
              {selectedBrand.clientType}
            </Text.Regular>
          </div>
        </div>

        {/* Detail card accordion */}
        <Accordion
          items={[
            {
              title: 'Ver detalles',
              content: selectedBrand.detailCard,
            },
          ]}
        />
      </div>
    </PopUp>
  )
}
