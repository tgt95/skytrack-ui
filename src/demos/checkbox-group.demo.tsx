import { useId, useState } from 'react'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import { CheckboxRoot } from '@/components/ui/checkbox'
import { FieldRoot, FieldLabel, FieldItem } from '@/components/ui/field'
import { FieldsetRoot, FieldsetLegend } from '@/components/ui/fieldset'
import { Form } from '@/components/ui/form'
import type { DemoMeta } from '@/showcase/demo'

const fruits = ['fuji-apple', 'gala-apple', 'granny-smith-apple']

const mainPermissions = ['view-dashboard', 'manage-users', 'access-reports']
const userManagementPermissions = ['create-user', 'edit-user', 'delete-user', 'assign-roles']

function BasicGroup() {
  const id = useId()
  return (
    <FieldRoot className='w-full gap-2'>
      <FieldLabel nativeLabel={false} render={<div />} id={id} className='font-semibold'>
        Apples
      </FieldLabel>
      <CheckboxGroup aria-labelledby={id} defaultValue={['fuji-apple']}>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <CheckboxRoot name='apple' value='fuji-apple' />
            Fuji
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <CheckboxRoot name='apple' value='gala-apple' />
            Gala
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <CheckboxRoot name='apple' value='granny-smith-apple' />
            Granny Smith
          </FieldLabel>
        </FieldItem>
      </CheckboxGroup>
    </FieldRoot>
  )
}

function ParentGroup() {
  const id = useId()
  const [value, setValue] = useState<string[]>([])

  return (
    <FieldRoot className='w-full'>
      <CheckboxGroup aria-labelledby={id} value={value} onValueChange={setValue} allValues={fruits}>
        <FieldItem>
          <FieldLabel id={id} className='flex items-center gap-2 font-normal'>
            <CheckboxRoot parent />
            Apples
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <CheckboxRoot value='fuji-apple' />
            Fuji
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <CheckboxRoot value='gala-apple' />
            Gala
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <CheckboxRoot value='granny-smith-apple' />
            Granny Smith
          </FieldLabel>
        </FieldItem>
      </CheckboxGroup>
    </FieldRoot>
  )
}

function NestedPermissions() {
  const id = useId()
  const [mainValue, setMainValue] = useState<string[]>([])
  const [managementValue, setManagementValue] = useState<string[]>([])

  return (
    <FieldRoot className='w-full'>
      <CheckboxGroup
        aria-labelledby={id}
        value={mainValue}
        onValueChange={(next) => {
          if (next.includes('manage-users')) {
            setManagementValue(userManagementPermissions)
          } else if (managementValue.length === userManagementPermissions.length) {
            setManagementValue([])
          }
          setMainValue(next)
        }}
        allValues={mainPermissions}
      >
        <FieldItem>
          <FieldLabel id={id} className='flex items-center gap-2 font-normal'>
            <CheckboxRoot
              parent
              indeterminate={managementValue.length > 0 && managementValue.length !== userManagementPermissions.length}
            />
            User Permissions
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <CheckboxRoot value='view-dashboard' />
            View Dashboard
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <CheckboxRoot value='access-reports' />
            Access Reports
          </FieldLabel>
        </FieldItem>

        <CheckboxGroup
          aria-labelledby='manage-users-caption'
          value={managementValue}
          onValueChange={(next) => {
            if (next.length === userManagementPermissions.length) {
              setMainValue((prev) => Array.from(new Set([...prev, 'manage-users'])))
            } else {
              setMainValue((prev) => prev.filter((v) => v !== 'manage-users'))
            }
            setManagementValue(next)
          }}
          allValues={userManagementPermissions}
          className='ml-4'
        >
          <FieldItem>
            <FieldLabel id='manage-users-caption' className='flex items-center gap-2 font-normal'>
              <CheckboxRoot parent />
              Manage Users
            </FieldLabel>
          </FieldItem>
          <FieldItem>
            <FieldLabel className='flex items-center gap-2 font-normal'>
              <CheckboxRoot value='create-user' />
              Create User
            </FieldLabel>
          </FieldItem>
          <FieldItem>
            <FieldLabel className='flex items-center gap-2 font-normal'>
              <CheckboxRoot value='edit-user' />
              Edit User
            </FieldLabel>
          </FieldItem>
          <FieldItem>
            <FieldLabel className='flex items-center gap-2 font-normal'>
              <CheckboxRoot value='delete-user' />
              Delete User
            </FieldLabel>
          </FieldItem>
          <FieldItem>
            <FieldLabel className='flex items-center gap-2 font-normal'>
              <CheckboxRoot value='assign-roles' />
              Assign Roles
            </FieldLabel>
          </FieldItem>
        </CheckboxGroup>
      </CheckboxGroup>
    </FieldRoot>
  )
}

export const demo: DemoMeta = {
  id: 'checkbox-group',
  title: 'Checkbox Group',
  description: 'Provides shared state to a series of checkboxes.',
  group: 'Forms',
  variants: [
    { name: 'Default', render: () => <BasicGroup /> },
    {
      name: 'Labeling a checkbox group',
      render: () => (
        <FieldRoot className='w-full gap-2'>
          <FieldLabel nativeLabel={false} render={<div />} id='protocols-label'>
            Allowed network protocols
          </FieldLabel>
          <CheckboxGroup aria-labelledby='protocols-label' defaultValue={['http']}>
            <FieldItem>
              <FieldLabel className='flex items-center gap-2 font-normal'>
                <CheckboxRoot value='http' />
                HTTP
              </FieldLabel>
            </FieldItem>
            <FieldItem>
              <FieldLabel className='flex items-center gap-2 font-normal'>
                <CheckboxRoot value='https' />
                HTTPS
              </FieldLabel>
            </FieldItem>
            <FieldItem>
              <FieldLabel className='flex items-center gap-2 font-normal'>
                <CheckboxRoot value='ssh' />
                SSH
              </FieldLabel>
            </FieldItem>
          </CheckboxGroup>
        </FieldRoot>
      )
    },
    {
      name: 'Rendering as a native button',
      render: () => (
        <FieldRoot className='w-full gap-2'>
          <FieldLabel nativeLabel={false} render={<div />} id='protocols-nb-label'>
            Allowed network protocols
          </FieldLabel>
          <CheckboxGroup aria-labelledby='protocols-nb-label'>
            <FieldItem className='flex items-center gap-2 text-sm'>
              <CheckboxRoot id='protocol-http' value='http' nativeButton render={<button />} />
              <FieldLabel htmlFor='protocol-http' className='text-foreground'>
                HTTP
              </FieldLabel>
            </FieldItem>
            <FieldItem className='flex items-center gap-2 text-sm'>
              <CheckboxRoot id='protocol-https' value='https' nativeButton render={<button />} />
              <FieldLabel htmlFor='protocol-https' className='text-foreground'>
                HTTPS
              </FieldLabel>
            </FieldItem>
          </CheckboxGroup>
        </FieldRoot>
      )
    },
    {
      name: 'Render callback',
      render: () => (
        <FieldRoot className='w-full gap-2'>
          <FieldLabel nativeLabel={false} render={<div />} id='protocols-cb-label'>
            Allowed network protocols
          </FieldLabel>
          <CheckboxGroup aria-labelledby='protocols-cb-label'>
            <FieldItem>
              <CheckboxRoot
                value='http'
                nativeButton
                render={(buttonProps) => (
                  <FieldLabel className='flex items-center gap-2 font-normal'>
                    <button {...buttonProps} />
                    HTTP
                  </FieldLabel>
                )}
              />
            </FieldItem>
            <FieldItem>
              <CheckboxRoot
                value='https'
                nativeButton
                render={(buttonProps) => (
                  <FieldLabel className='flex items-center gap-2 font-normal'>
                    <button {...buttonProps} />
                    HTTPS
                  </FieldLabel>
                )}
              />
            </FieldItem>
          </CheckboxGroup>
        </FieldRoot>
      )
    },
    {
      name: 'Form integration',
      render: () => (
        <Form className='w-full'>
          <FieldRoot name='allowedNetworkProtocols'>
            <FieldsetRoot render={<CheckboxGroup />}>
              <FieldsetLegend>Allowed network protocols {`<FieldsetLegend>`}</FieldsetLegend>
              <FieldItem>
                <FieldLabel className='flex items-center gap-2'>
                  <CheckboxRoot value='http' />
                  {`<FieldItem> 1`}
                </FieldLabel>
              </FieldItem>
              <FieldItem>
                <FieldLabel className='flex items-center gap-2'>
                  <CheckboxRoot value='https' />
                  {`<FieldItem> 2`}
                </FieldLabel>
              </FieldItem>
              <FieldItem>
                <FieldLabel className='flex items-center gap-2'>
                  <CheckboxRoot value='ssh' />
                  {`<FieldItem> 3`}
                </FieldLabel>
              </FieldItem>
            </FieldsetRoot>
          </FieldRoot>
        </Form>
      )
    },
    { name: 'Parent checkbox', render: () => <ParentGroup /> },
    { name: 'Nested parent checkbox', render: () => <NestedPermissions /> },
    {
      name: 'Disabled group',
      render: () => (
        <FieldRoot className='w-full'>
          <CheckboxGroup aria-label='Disabled group' disabled defaultValue={['http']}>
            <FieldItem>
              <FieldLabel className='flex items-center gap-2 font-normal'>
                <CheckboxRoot value='http' />
                HTTP
              </FieldLabel>
            </FieldItem>
            <FieldItem>
              <FieldLabel className='flex items-center gap-2 font-normal'>
                <CheckboxRoot value='https' />
                HTTPS
              </FieldLabel>
            </FieldItem>
          </CheckboxGroup>
        </FieldRoot>
      )
    }
  ]
}
