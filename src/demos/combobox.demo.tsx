import * as React from 'react'
import { CheckIcon, CircleNotchIcon, PlusIcon } from '@phosphor-icons/react'
import {
  Combobox,
  ComboboxArrow,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxClear,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxTriggerButton,
  ComboboxValue,
  type ComboboxRootProps,
  createComboboxItems,
  useComboboxFilter,
  useComboboxFilteredItems
} from '@/components/ui/combobox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle
} from '@/components/ui/dialog'
import type { DemoMeta } from '@/showcase/demo'

/* ------------------------------------------------------------------ hero -- */

interface Fruit {
  label: string
  value: string
}

const fruits: Fruit[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Grape', value: 'grape' },
  { label: 'Mango', value: 'mango' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Raspberry', value: 'raspberry' },
  { label: 'Blackberry', value: 'blackberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Peach', value: 'peach' },
  { label: 'Pear', value: 'pear' },
  { label: 'Plum', value: 'plum' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Watermelon', value: 'watermelon' },
  { label: 'Cantaloupe', value: 'cantaloupe' },
  { label: 'Honeydew', value: 'honeydew' },
  { label: 'Papaya', value: 'papaya' },
  { label: 'Guava', value: 'guava' },
  { label: 'Lychee', value: 'lychee' },
  { label: 'Pomegranate', value: 'pomegranate' },
  { label: 'Apricot', value: 'apricot' },
  { label: 'Grapefruit', value: 'grapefruit' },
  { label: 'Passionfruit', value: 'passionfruit' }
]

function FruitCombobox() {
  const id = React.useId()
  return (
    <Combobox items={fruits}>
      <div className='flex w-56 flex-col gap-1'>
        <label htmlFor={id} className='text-sm leading-none font-medium'>
          Choose a fruit
        </label>
        <ComboboxInputGroup>
          <ComboboxInput id={id} placeholder='e.g. Apple' />
          <ComboboxClear aria-label='Clear selection' />
          <ComboboxTrigger aria-label='Open popup' />
        </ComboboxInputGroup>
      </div>

      <ComboboxPortal>
        <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
          <ComboboxPopup>
            <ComboboxEmpty>No fruits found.</ComboboxEmpty>
            <ComboboxList>
              {(item: Fruit) => (
                <ComboboxItem key={item.value} value={item}>
                  <ComboboxItemIndicator>
                    <CheckIcon className='size-4' />
                  </ComboboxItemIndicator>
                  <span className='col-start-2'>{item.label}</span>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  )
}

/* ------------------------------------------------------- typed wrapper -- */

/** Docs: Typed wrapper component. */
function MyCombobox<Value, Multiple extends boolean | undefined = false, Item = Value>(
  props: ComboboxRootProps<Value, Multiple, Item>
) {
  return <Combobox {...props} />
}

interface Country {
  code: string
  value: string
  continent: string
  label: string
}

const countries: Country[] = [
  { code: 'au', value: 'australia', label: 'Australia', continent: 'Oceania' },
  { code: 'br', value: 'brazil', label: 'Brazil', continent: 'South America' },
  { code: 'ca', value: 'canada', label: 'Canada', continent: 'North America' },
  { code: 'fr', value: 'france', label: 'France', continent: 'Europe' },
  { code: 'de', value: 'germany', label: 'Germany', continent: 'Europe' },
  { code: 'in', value: 'india', label: 'India', continent: 'Asia' },
  { code: 'jp', value: 'japan', label: 'Japan', continent: 'Asia' },
  { code: 'ke', value: 'kenya', label: 'Kenya', continent: 'Africa' },
  { code: 'mx', value: 'mexico', label: 'Mexico', continent: 'North America' },
  { code: 'za', value: 'south-africa', label: 'South Africa', continent: 'Africa' },
  { code: 'es', value: 'spain', label: 'Spain', continent: 'Europe' },
  { code: 'gb', value: 'united-kingdom', label: 'United Kingdom', continent: 'Europe' },
  { code: 'us', value: 'united-states', label: 'United States', continent: 'North America' },
  { code: 'vn', value: 'vietnam', label: 'Vietnam', continent: 'Asia' }
]

function TypedWrapperCombobox() {
  return (
    <MyCombobox<string> items={countries} defaultValue='france'>
      <ComboboxTriggerButton className='w-56'>
        <ComboboxValue />
      </ComboboxTriggerButton>
      <ComboboxPortal>
        <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
          <ComboboxPopup>
            <ComboboxList>
              {(country: Country) => (
                <ComboboxItem key={country.code} value={country.value}>
                  <ComboboxItemIndicator>
                    <CheckIcon className='size-4' />
                  </ComboboxItemIndicator>
                  <span className='col-start-2'>{country.label}</span>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </MyCombobox>
  )
}

/* -------------------------------------------------- value selection IDs -- */

interface DirectoryUser {
  id: string
  name: string
  username: string
  email: string
  title: string
}

const users: DirectoryUser[] = [
  {
    id: 'leslie-alexander',
    name: 'Leslie Alexander',
    username: 'leslie',
    email: 'leslie.alexander@example.com',
    title: 'Product Manager'
  },
  {
    id: 'kathryn-murphy',
    name: 'Kathryn Murphy',
    username: 'kathryn',
    email: 'kathryn.murphy@example.com',
    title: 'Marketing Lead'
  },
  {
    id: 'courtney-henry',
    name: 'Courtney Henry',
    username: 'courtney',
    email: 'courtney.henry@example.com',
    title: 'Design Systems'
  },
  {
    id: 'michael-foster',
    name: 'Michael Foster',
    username: 'michael',
    email: 'michael.foster@example.com',
    title: 'Engineering Manager'
  },
  {
    id: 'ariana-white',
    name: 'Ariana White',
    username: 'ariana',
    email: 'ariana.white@example.com',
    title: 'Accessibility Lead'
  },
  {
    id: 'daniel-kim',
    name: 'Daniel Kim',
    username: 'daniel',
    email: 'daniel.kim@example.com',
    title: 'Staff Engineer'
  }
]

// Docs: static collection created at module scope from IDs.
const userItems = createComboboxItems(users, {
  getValue: (user) => user.id,
  getLabel: (user) => user.name
})

function IdValueCombobox() {
  const id = React.useId()
  return (
    <Combobox items={userItems} defaultValue='daniel-kim'>
      <div className='flex w-64 flex-col gap-1'>
        <label htmlFor={id} className='text-sm leading-none font-medium'>
          Reviewer
        </label>
        <ComboboxInputGroup>
          <ComboboxInput id={id} placeholder='e.g. Michael' />
          <ComboboxClear aria-label='Clear selection' />
          <ComboboxTrigger aria-label='Open popup' />
        </ComboboxInputGroup>
      </div>
      <ComboboxPortal>
        <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
          <ComboboxPopup>
            <ComboboxEmpty>No people found.</ComboboxEmpty>
            <ComboboxList>
              {(user: DirectoryUser) => (
                <ComboboxItem key={user.id} value={user.id}>
                  <ComboboxItemIndicator>
                    <CheckIcon className='size-4' />
                  </ComboboxItemIndicator>
                  <span className='col-start-2 flex flex-col'>
                    <span className='font-medium'>{user.name}</span>
                    <span className='text-xs text-muted-foreground'>{user.title}</span>
                  </span>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  )
}

/* ------------------------------------------------------ multiple select -- */

interface ProgrammingLanguage {
  id: string
  value: string
}

const langs: ProgrammingLanguage[] = [
  { id: 'js', value: 'JavaScript' },
  { id: 'ts', value: 'TypeScript' },
  { id: 'py', value: 'Python' },
  { id: 'java', value: 'Java' },
  { id: 'cpp', value: 'C++' },
  { id: 'cs', value: 'C#' },
  { id: 'php', value: 'PHP' },
  { id: 'ruby', value: 'Ruby' },
  { id: 'go', value: 'Go' },
  { id: 'rust', value: 'Rust' },
  { id: 'swift', value: 'Swift' }
]

function MultipleCombobox() {
  const id = React.useId()
  return (
    <Combobox<ProgrammingLanguage, true> items={langs} multiple>
      <div className='flex w-80 max-w-full flex-col gap-1'>
        <label htmlFor={id} className='text-sm leading-none font-medium'>
          Programming languages
        </label>
        <ComboboxInputGroup shape='chips'>
          <ComboboxValue>
            {(value: ProgrammingLanguage[]) => (
              <ComboboxChips aria-label={value.length > 0 ? 'Selected languages' : undefined}>
                {value.map((language) => (
                  <ComboboxChip key={language.id} aria-label={language.value}>
                    {language.value}
                    <ComboboxChipRemove aria-label={`Remove ${language.value}`} />
                  </ComboboxChip>
                ))}
                <ComboboxInput id={id} placeholder={value.length > 0 ? '' : 'e.g. TypeScript'} />
              </ComboboxChips>
            )}
          </ComboboxValue>
        </ComboboxInputGroup>
      </div>

      <ComboboxPortal>
        <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
          <ComboboxPopup>
            <ComboboxEmpty>No languages found.</ComboboxEmpty>
            <ComboboxList>
              {(language: ProgrammingLanguage) => (
                <ComboboxItem key={language.id} value={language}>
                  <ComboboxItemIndicator>
                    <CheckIcon className='size-4' />
                  </ComboboxItemIndicator>
                  <span className='col-start-2'>{language.value}</span>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  )
}

/* ------------------------------------------------- input inside popup -- */

function PopupInputCombobox() {
  return (
    <div className='flex flex-col items-start gap-1'>
      <Combobox items={countries}>
        <ComboboxLabel>Country</ComboboxLabel>
        <ComboboxTriggerButton className='w-48'>
          <ComboboxValue placeholder='Select country' />
        </ComboboxTriggerButton>
        <ComboboxPortal>
          <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
            <ComboboxPopup aria-label='Select country' className='min-w-72'>
              <ComboboxArrow className='absolute -top-2 left-1/2 -translate-x-1/2' />
              <ComboboxInput
                className='h-9 w-full min-w-72 rounded-none border-0 border-b border-border bg-transparent px-2 text-sm outline-hidden placeholder:text-muted-foreground'
                placeholder='e.g. United Kingdom'
              />
              <ComboboxEmpty>No countries found.</ComboboxEmpty>
              <ComboboxList className='max-h-72'>
                {(country: Country) => (
                  <ComboboxItem key={country.code} value={country}>
                    <ComboboxItemIndicator>
                      <CheckIcon className='size-4' />
                    </ComboboxItemIndicator>
                    <span className='col-start-2'>{country.label}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    </div>
  )
}

/* ------------------------------------------------------------- grouped -- */

interface Produce {
  id: string
  label: string
  group: 'Fruits' | 'Vegetables'
}

interface ProduceGroup {
  value: string
  items: Produce[]
}

const produceData: Produce[] = [
  { id: 'fruit-apple', label: 'Apple', group: 'Fruits' },
  { id: 'fruit-banana', label: 'Banana', group: 'Fruits' },
  { id: 'fruit-mango', label: 'Mango', group: 'Fruits' },
  { id: 'fruit-kiwi', label: 'Kiwi', group: 'Fruits' },
  { id: 'fruit-grape', label: 'Grape', group: 'Fruits' },
  { id: 'fruit-orange', label: 'Orange', group: 'Fruits' },
  { id: 'veg-broccoli', label: 'Broccoli', group: 'Vegetables' },
  { id: 'veg-carrot', label: 'Carrot', group: 'Vegetables' },
  { id: 'veg-cauliflower', label: 'Cauliflower', group: 'Vegetables' },
  { id: 'veg-cucumber', label: 'Cucumber', group: 'Vegetables' },
  { id: 'veg-kale', label: 'Kale', group: 'Vegetables' },
  { id: 'veg-spinach', label: 'Spinach', group: 'Vegetables' }
]

const groupedProduce: ProduceGroup[] = (['Fruits', 'Vegetables'] as const).map((value) => ({
  value,
  items: produceData.filter((item) => item.group === value)
}))

function GroupedCombobox() {
  const id = React.useId()
  return (
    <Combobox items={groupedProduce}>
      <div className='flex w-64 flex-col gap-1'>
        <label htmlFor={id} className='text-sm leading-none font-medium'>
          Select produce
        </label>
        <ComboboxInputGroup>
          <ComboboxInput id={id} placeholder='e.g. Mango' />
          <ComboboxClear aria-label='Clear selection' />
          <ComboboxTrigger aria-label='Open popup' />
        </ComboboxInputGroup>
      </div>
      <ComboboxPortal>
        <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
          <ComboboxPopup>
            <ComboboxEmpty>No produce found.</ComboboxEmpty>
            <ComboboxList>
              {(group: ProduceGroup) => (
                <ComboboxGroup key={group.value} items={group.items}>
                  <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
                  <ComboboxCollection>
                    {(item: Produce) => (
                      <ComboboxItem key={item.id} value={item}>
                        <ComboboxItemIndicator>
                          <CheckIcon className='size-4' />
                        </ComboboxItemIndicator>
                        <span className='col-start-2'>{item.label}</span>
                      </ComboboxItem>
                    )}
                  </ComboboxCollection>
                </ComboboxGroup>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  )
}

/* --------------------------------------------------------- async single -- */

async function searchUsers(
  query: string,
  filter: (item: string, query: string) => boolean
): Promise<{ users: DirectoryUser[]; error: string | null }> {
  await new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 400 + 150)
  })

  if (query === 'will_error') {
    return { users: [], error: 'Failed to fetch people. Please try again.' }
  }

  const matched = users.filter(
    (user) =>
      filter(user.name, query) || filter(user.username, query) || filter(user.email, query) || filter(user.title, query)
  )

  return { users: matched, error: null }
}

function AsyncSingleCombobox() {
  const id = React.useId()
  const [searchResults, setSearchResults] = React.useState<DirectoryUser[]>([])
  const [selectedValue, setSelectedValue] = React.useState<DirectoryUser | null>(null)
  const [searchValue, setSearchValue] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const { contains } = useComboboxFilter()
  const abortControllerRef = React.useRef<AbortController | null>(null)

  const trimmed = searchValue.trim()

  const items = React.useMemo(() => {
    if (!selectedValue || searchResults.some((user) => user.id === selectedValue.id)) {
      return searchResults
    }
    return [...searchResults, selectedValue]
  }, [searchResults, selectedValue])

  let status: React.ReactNode = null
  if (isPending) {
    status = (
      <>
        <CircleNotchIcon className='size-3 animate-spin' />
        Searching…
      </>
    )
  } else if (error) {
    status = error
  } else if (trimmed === '') {
    status = selectedValue ? null : 'Start typing to search people…'
  } else if (searchResults.length === 0) {
    status = `No matches for "${trimmed}".`
  }

  const emptyMessage =
    trimmed === '' || isPending || searchResults.length > 0 || error ? null : 'Try a different search term.'

  return (
    <Combobox
      items={items}
      itemToStringLabel={(user: DirectoryUser) => user.name}
      isItemEqualToValue={(item, value) => item.id === value.id}
      filter={null}
      onOpenChangeComplete={(open) => {
        if (!open && selectedValue) {
          setSearchResults([selectedValue])
        }
      }}
      onValueChange={(next: DirectoryUser | null) => {
        setSelectedValue(next)
        setSearchValue('')
        setError(null)
      }}
      onInputValueChange={(next: string, { reason }) => {
        setSearchValue(next)

        if (next === '') {
          setSearchResults([])
          setError(null)
          return
        }

        if (reason === 'item-press') {
          return
        }

        const controller = new AbortController()
        abortControllerRef.current?.abort()
        abortControllerRef.current = controller

        startTransition(async () => {
          setError(null)
          const result = await searchUsers(next, contains)
          if (controller.signal.aborted) {
            return
          }
          startTransition(() => {
            setSearchResults(result.users)
            setError(result.error)
          })
        })
      }}
    >
      <div className='flex w-80 max-w-full flex-col gap-1'>
        <label htmlFor={id} className='text-sm leading-none font-medium'>
          Assign reviewer
        </label>
        <ComboboxInputGroup>
          <ComboboxInput id={id} placeholder='e.g. Michael' />
          <ComboboxClear aria-label='Clear selection' />
          <ComboboxTrigger aria-label='Open popup' />
        </ComboboxInputGroup>
      </div>
      <ComboboxPortal>
        <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
          <ComboboxPopup aria-busy={isPending || undefined}>
            <ComboboxStatus>
              {status ? (
                <div className='flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground'>{status}</div>
              ) : null}
            </ComboboxStatus>
            <ComboboxEmpty>{emptyMessage ? <div className='px-2 py-2'>{emptyMessage}</div> : null}</ComboboxEmpty>
            <ComboboxList>
              {(user: DirectoryUser) => (
                <ComboboxItem key={user.id} value={user} className='items-start'>
                  <ComboboxItemIndicator className='mt-1'>
                    <CheckIcon className='size-4' />
                  </ComboboxItemIndicator>
                  <span className='col-start-2 flex flex-col'>
                    <span className='font-medium'>{user.name}</span>
                    <span className='text-xs text-muted-foreground'>{user.email}</span>
                    <span className='flex flex-wrap gap-2 text-xs text-muted-foreground'>
                      <span>@{user.username}</span>
                      <span>{user.title}</span>
                    </span>
                  </span>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  )
}

/* --------------------------------------------------------- async multiple -- */

function AsyncMultipleCombobox() {
  const id = React.useId()
  const [searchResults, setSearchResults] = React.useState<DirectoryUser[]>([])
  const [selectedValues, setSelectedValues] = React.useState<DirectoryUser[]>([])
  const [searchValue, setSearchValue] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const { contains } = useComboboxFilter()
  const abortControllerRef = React.useRef<AbortController | null>(null)
  const selectedValuesRef = React.useRef<DirectoryUser[]>([])

  const trimmed = searchValue.trim()

  const items = React.useMemo(() => {
    if (selectedValues.length === 0) {
      return searchResults
    }
    const merged = [...searchResults]
    selectedValues.forEach((user) => {
      if (!searchResults.some((result) => result.id === user.id)) {
        merged.push(user)
      }
    })
    return merged
  }, [searchResults, selectedValues])

  let status: React.ReactNode = null
  if (isPending) {
    status = (
      <>
        <CircleNotchIcon className='size-3 animate-spin' />
        Searching…
      </>
    )
  } else if (error) {
    status = error
  } else if (trimmed === '') {
    status = selectedValues.length > 0 ? null : 'Start typing to search people…'
  } else if (searchResults.length === 0) {
    status = `No matches for "${trimmed}".`
  }

  const emptyMessage =
    trimmed === '' || isPending || searchResults.length > 0 || error ? null : 'Try a different search term.'

  return (
    <Combobox
      items={items}
      itemToStringLabel={(user: DirectoryUser) => user.name}
      isItemEqualToValue={(item, value) => item.id === value.id}
      multiple
      filter={null}
      onOpenChangeComplete={(open) => {
        if (!open) {
          setSearchResults(selectedValuesRef.current)
        }
      }}
      onValueChange={(next: DirectoryUser[]) => {
        selectedValuesRef.current = next
        setSelectedValues(next)
        setSearchValue('')
        setError(null)
        setSearchResults(next.length === 0 ? [] : selectedValuesRef.current)
      }}
      onInputValueChange={(next: string, { reason }) => {
        setSearchValue(next)

        const controller = new AbortController()
        abortControllerRef.current?.abort()
        abortControllerRef.current = controller

        if (next === '') {
          setSearchResults(selectedValuesRef.current)
          setError(null)
          return
        }

        if (reason === 'item-press') {
          return
        }

        startTransition(async () => {
          setError(null)
          const result = await searchUsers(next, contains)
          if (controller.signal.aborted) {
            return
          }
          startTransition(() => {
            setSearchResults(result.users)
            setError(result.error)
          })
        })
      }}
    >
      <div className='flex w-80 max-w-full flex-col gap-1'>
        <label htmlFor={id} className='text-sm leading-none font-medium'>
          Assign reviewers
        </label>
        <ComboboxInputGroup shape='chips'>
          <ComboboxValue>
            {(value: DirectoryUser[]) => (
              <ComboboxChips aria-label={value.length > 0 ? 'Selected reviewers' : undefined}>
                {value.map((user) => (
                  <ComboboxChip key={user.id} aria-label={user.name}>
                    {user.name}
                    <ComboboxChipRemove aria-label={`Remove ${user.name}`} />
                  </ComboboxChip>
                ))}
                <ComboboxInput id={id} placeholder={value.length > 0 ? '' : 'e.g. Michael'} />
              </ComboboxChips>
            )}
          </ComboboxValue>
        </ComboboxInputGroup>
      </div>
      <ComboboxPortal>
        <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
          <ComboboxPopup aria-busy={isPending || undefined}>
            <ComboboxStatus>
              {status ? (
                <div className='flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground'>{status}</div>
              ) : null}
            </ComboboxStatus>
            <ComboboxEmpty>{emptyMessage ? <div className='px-2 py-2'>{emptyMessage}</div> : null}</ComboboxEmpty>
            <ComboboxList>
              {(user: DirectoryUser) => (
                <ComboboxItem key={user.id} value={user} className='items-start'>
                  <ComboboxItemIndicator className='mt-1'>
                    <CheckIcon className='size-4' />
                  </ComboboxItemIndicator>
                  <span className='col-start-2 flex flex-col'>
                    <span className='font-medium'>{user.name}</span>
                    <span className='text-xs text-muted-foreground'>{user.email}</span>
                    <span className='flex flex-wrap gap-2 text-xs text-muted-foreground'>
                      <span>@{user.username}</span>
                      <span>{user.title}</span>
                    </span>
                  </span>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  )
}

/* ------------------------------------------------------------ creatable -- */

interface LabelItem {
  creatable?: string
  id: string
  value: string
}

const initialLabels: LabelItem[] = [
  { id: 'bug', value: 'bug' },
  { id: 'docs', value: 'documentation' },
  { id: 'enhancement', value: 'enhancement' },
  { id: 'help-wanted', value: 'help wanted' },
  { id: 'good-first-issue', value: 'good first issue' }
]

function CreatableCombobox() {
  const id = React.useId()
  const [labels, setLabels] = React.useState<LabelItem[]>(initialLabels)
  const [selected, setSelected] = React.useState<LabelItem[]>([])
  const [query, setQuery] = React.useState('')
  const [pendingCreate, setPendingCreate] = React.useState<string | null>(null)
  const [createName, setCreateName] = React.useState('')

  const trimmed = query.trim()
  const lowered = trimmed.toLocaleLowerCase()
  const exactExists = labels.some((l) => l.value.trim().toLocaleLowerCase() === lowered)

  const itemsForView: LabelItem[] =
    trimmed !== '' && !exactExists
      ? [...labels, { creatable: trimmed, id: `create:${lowered}`, value: `Create "${trimmed}"` }]
      : labels

  function createLabel(raw: string) {
    const value = raw.trim()
    if (!value) {
      return
    }
    const normalized = value.toLocaleLowerCase()
    const existing = labels.find((l) => l.value.trim().toLocaleLowerCase() === normalized)
    if (existing) {
      setSelected((prev) => (prev.some((item) => item.id === existing.id) ? prev : [...prev, existing]))
      setQuery('')
      setPendingCreate(null)
      setCreateName('')
      return
    }

    const baseId = normalized.replace(/\s+/g, '-')
    const existingIds = new Set(labels.map((l) => l.id))
    let uniqueId = baseId
    if (existingIds.has(uniqueId)) {
      let i = 2
      while (existingIds.has(`${baseId}-${i}`)) {
        i += 1
      }
      uniqueId = `${baseId}-${i}`
    }

    const newItem: LabelItem = { id: uniqueId, value }
    setLabels((prev) => [...prev, newItem])
    setSelected((prev) => (prev.some((i) => i.id === newItem.id) ? prev : [...prev, newItem]))
    setQuery('')
    setPendingCreate(null)
    setCreateName('')
  }

  return (
    <div className='flex w-80 max-w-full flex-col gap-2'>
      <Combobox
        items={itemsForView}
        multiple
        value={selected}
        inputValue={query}
        onInputValueChange={setQuery}
        onValueChange={(next: LabelItem[]) => {
          const creatableSelection = next.find(
            (item) => item.creatable && !selected.some((current) => current.id === item.id)
          )
          if (creatableSelection?.creatable) {
            setPendingCreate(creatableSelection.creatable)
            setCreateName(creatableSelection.creatable)
            return
          }
          setSelected(next.filter((i) => !i.creatable))
          setQuery('')
        }}
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor={id} className='text-sm leading-none font-medium'>
            Labels
          </label>
          <ComboboxInputGroup shape='chips'>
            <ComboboxValue>
              {(value: LabelItem[]) => (
                <ComboboxChips aria-label={value.length > 0 ? 'Selected labels' : undefined}>
                  {value.map((label) => (
                    <ComboboxChip key={label.id} aria-label={label.value}>
                      {label.value}
                      <ComboboxChipRemove aria-label={`Remove ${label.value}`} />
                    </ComboboxChip>
                  ))}
                  <ComboboxInput
                    id={id}
                    placeholder={value.length > 0 ? '' : 'e.g. bug'}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                      if (event.key === 'Enter' && pendingCreate === null) {
                        event.preventDefault()
                        if (trimmed !== '' && !exactExists) {
                          setPendingCreate(trimmed)
                          setCreateName(trimmed)
                        }
                      }
                    }}
                  />
                </ComboboxChips>
              )}
            </ComboboxValue>
          </ComboboxInputGroup>
        </div>

        <ComboboxPortal>
          <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
            <ComboboxPopup>
              <ComboboxEmpty>No labels found.</ComboboxEmpty>
              <ComboboxList>
                {(item: LabelItem) =>
                  item.creatable ? (
                    <ComboboxItem
                      key={item.id}
                      value={item}
                      onClick={() => {
                        setPendingCreate(item.creatable ?? null)
                        setCreateName(item.creatable ?? '')
                      }}
                    >
                      <span className='col-start-1 flex items-center justify-center'>
                        <PlusIcon className='size-4' />
                      </span>
                      <span className='col-start-2'>Create "{item.creatable}"</span>
                    </ComboboxItem>
                  ) : (
                    <ComboboxItem key={item.id} value={item}>
                      <ComboboxItemIndicator>
                        <CheckIcon className='size-4' />
                      </ComboboxItemIndicator>
                      <span className='col-start-2'>{item.value}</span>
                    </ComboboxItem>
                  )
                }
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>

      <Dialog
        open={pendingCreate !== null}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            setPendingCreate(null)
          }
        }}
      >
        <DialogPortal>
          <DialogBackdrop />
          <DialogPopup className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Create new label</DialogTitle>
              <DialogDescription>Add a new label to select.</DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                createLabel(createName)
              }}
            >
              <Input
                aria-label='Label name'
                name='labelName'
                value={createName}
                onChange={(event) => setCreateName(event.target.value)}
              />
              <DialogFooter className='mt-4'>
                <DialogClose variant='outline'>Cancel</DialogClose>
                <Button type='submit' size='sm'>
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
    </div>
  )
}

/* ---------------------------------------------------------- virtualized -- */

interface VirtualizedItem {
  id: string
  name: string
}

const virtualizedItems: VirtualizedItem[] = Array.from({ length: 10000 }, (_, index) => {
  const id = String(index + 1)
  return { id, name: `Item ${id.padStart(4, '0')}` }
})

const ROW_HEIGHT = 32
const OVERSCAN = 12

function VirtualizedCombobox() {
  const id = React.useId()
  const [open, setOpen] = React.useState(false)
  return (
    <div className='flex w-64 flex-col gap-1'>
      <label htmlFor={id} className='text-sm leading-none font-medium'>
        Search 10,000 items
      </label>
      <Combobox
        virtualized
        items={virtualizedItems}
        open={open}
        onOpenChange={setOpen}
        itemToStringLabel={(item: VirtualizedItem) => item.name}
      >
        <ComboboxInputGroup>
          <ComboboxInput id={id} placeholder='e.g. Item 0042' />
          <ComboboxClear aria-label='Clear selection' />
          <ComboboxTrigger aria-label='Open popup' />
        </ComboboxInputGroup>
        <ComboboxPortal>
          <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
            <ComboboxPopup>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList className='p-0'>
                <VirtualizedList />
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    </div>
  )
}

/**
 * Fixed-height windowing over the filtered items. Replaces the
 * `@tanstack/react-virtual` dependency used in the docs example.
 */
function VirtualizedList() {
  const filteredItems = useComboboxFilteredItems<VirtualizedItem>()
  const [scrollTop, setScrollTop] = React.useState(0)
  const [viewportHeight, setViewportHeight] = React.useState(288)

  const total = filteredItems.length
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN)
  const visibleCount = Math.ceil(viewportHeight / ROW_HEIGHT) + OVERSCAN * 2
  const endIndex = Math.min(total, startIndex + visibleCount)
  const window = filteredItems.slice(startIndex, endIndex)

  return (
    <div
      role='presentation'
      className='max-h-72 overflow-auto overscroll-contain scroll-py-1'
      onScroll={(event) => {
        setScrollTop(event.currentTarget.scrollTop)
        setViewportHeight(event.currentTarget.clientHeight || 288)
      }}
    >
      <div role='presentation' className='relative w-full' style={{ height: total * ROW_HEIGHT }}>
        {window.map((item, offset) => {
          const index = startIndex + offset
          return (
            <ComboboxItem
              key={item.id}
              index={index}
              value={item}
              aria-setsize={total}
              aria-posinset={index + 1}
              className='absolute left-0 w-full'
              style={{
                top: 0,
                height: ROW_HEIGHT,
                transform: `translateY(${index * ROW_HEIGHT}px)`
              }}
            >
              <ComboboxItemIndicator>
                <CheckIcon className='size-4' />
              </ComboboxItemIndicator>
              <span className='col-start-2'>{item.name}</span>
            </ComboboxItem>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- variants -- */

function SizesCombobox() {
  return (
    <>
      <Combobox items={fruits}>
        <ComboboxInputGroup size='sm' className='w-48'>
          <ComboboxInput aria-label='Small' placeholder='Small' />
          <ComboboxClear aria-label='Clear selection' />
          <ComboboxTrigger aria-label='Open popup' />
        </ComboboxInputGroup>
        <ComboboxPortal>
          <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
            <ComboboxPopup>
              <ComboboxList>
                {(item: Fruit) => (
                  <ComboboxItem key={item.value} value={item}>
                    <ComboboxItemIndicator />
                    <span className='col-start-2'>{item.label}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
      <Combobox items={fruits}>
        <ComboboxInputGroup className='w-48'>
          <ComboboxInput aria-label='Default' placeholder='Default' />
          <ComboboxClear aria-label='Clear selection' />
          <ComboboxTrigger aria-label='Open popup' />
        </ComboboxInputGroup>
        <ComboboxPortal>
          <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
            <ComboboxPopup>
              <ComboboxList>
                {(item: Fruit) => (
                  <ComboboxItem key={item.value} value={item}>
                    <ComboboxItemIndicator />
                    <span className='col-start-2'>{item.label}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    </>
  )
}

export const demo: DemoMeta = {
  id: 'combobox',
  title: 'Combobox',
  description: 'A filterable select: an input with a list of predefined, selectable items.',
  group: 'Forms',
  variants: [
    { name: 'Default', render: () => <FruitCombobox /> },
    { name: 'Typed wrapper component', render: () => <TypedWrapperCombobox /> },
    { name: 'Value selection with IDs', render: () => <IdValueCombobox /> },
    { name: 'Multiple select', render: () => <MultipleCombobox /> },
    { name: 'Input inside popup', render: () => <PopupInputCombobox /> },
    { name: 'Grouped', render: () => <GroupedCombobox /> },
    { name: 'Async search (single)', render: () => <AsyncSingleCombobox /> },
    { name: 'Async search (multiple)', render: () => <AsyncMultipleCombobox /> },
    { name: 'Creatable', render: () => <CreatableCombobox /> },
    { name: 'Virtualized', render: () => <VirtualizedCombobox /> },
    { name: 'Sizes', render: () => <SizesCombobox /> }
  ]
}
