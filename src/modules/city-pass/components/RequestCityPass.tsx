import {RedirectButton} from '@/components/ui/buttons/RedirectButton'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {RedirectKey} from '@/modules/redirects/types'

export const RequestCityPass = () => (
  <>
    <Title text="Stadspas" />
    <Gutter height="sm" />
    <Paragraph>
      De Stadspas is voor Amsterdammers met een laag inkomen en weinig vermogen.
      Met de Stadspas kunt u gratis of met korting leuke activiteiten doen.
    </Paragraph>
    <Gutter height="lg" />
    <RedirectButton
      label="Stadspas aanvragen"
      redirectKey={RedirectKey.cityPassRequest}
      testID="CityPassRequestCityPassButton"
      variant="secondary"
    />
  </>
)
