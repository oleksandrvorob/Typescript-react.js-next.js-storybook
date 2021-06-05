import PropertySpecs from '.'

export default { title: 'Property Specs' }

export const Example = () => <PropertySpecs bedCount={3} bathCount={2} sqft={1191} />
export const withNoProps = () => <PropertySpecs />
