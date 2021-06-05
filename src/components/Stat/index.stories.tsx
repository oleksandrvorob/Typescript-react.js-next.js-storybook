import Stat from './'

export default { title: 'Stat' }

export const Example = () => <Stat label="address" value="123 main st" />

export const Multiple = () => (
  <>
    <Stat
      label="address"
      value="123 main st a really really long address because some asshole has too much text"
    />
    <Stat label="city" value="normal" />
    <Stat label="state" value="IL" />
  </>
)
