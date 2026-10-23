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
    <CheckboxGroup aria-labelledby={id} defaultValue={['fuji-apple']}>
      <div className='text-sm font-semibold' id={id}>
        Apples
      </div>
      <label className='flex items-center gap-2 text-sm'>
        <CheckboxRoot name='apple' value='fuji-apple' />
        Fuji
      </label>
      <label className='flex items-center gap-2 text-sm'>
        <CheckboxRoot name='apple' value='gala-apple' />
        Gala
      </label>
      <label className='flex items-center gap-2 text-sm'>
        <CheckboxRoot name='apple' value='granny-smith-apple' />
        Granny Smith
      </label>
    </CheckboxGroup>
  )
}

function ParentGroup() {
  const id = useId()
  const [value, setValue] = useState<string[]>([])

  return (
    <CheckboxGroup aria-labelledby={id} value={value} onValueChange={setValue} allValues={fruits}>
      <label className='flex items-center gap-2 text-sm' id={id}>
        <CheckboxRoot parent />
        Apples
      </label>
      <label className='flex items-center gap-2 text-sm'>
        <CheckboxRoot value='fuji-apple' />
        Fuji
      </label>
      <label className='flex items-center gap-2 text-sm'>
        <CheckboxRoot value='gala-apple' />
        Gala
      </label>
      <label className='flex items-center gap-2 text-sm'>
        <CheckboxRoot value='granny-smith-apple' />
        Granny Smith
      </label>
    </CheckboxGroup>
  )
}

function NestedPermissions() {
  const id = useId()
  const [mainValue, setMainValue] = useState<string[]>([])
  const [managementValue, setManagementValue] = useState<string[]>([])

  return (
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
      <label className='flex items-center gap-2 text-sm' id={id}>
        <CheckboxRoot
          parent
          indeterminate={managementValue.length > 0 && managementValue.length !== userManagementPermissions.length}
        />
        User Permissions
      </label>
      <label className='flex items-center gap-2 text-sm'>
        <CheckboxRoot value='view-dashboard' />
        View Dashboard
      </label>
      <label className='flex items-center gap-2 text-sm'>
        <CheckboxRoot value='access-reports' />
        Access Reports
      </label>

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
        <label className='flex items-center gap-2 text-sm' id='manage-users-caption'>
          <CheckboxRoot parent />
          Manage Users
        </label>
        <label className='flex items-center gap-2 text-sm'>
          <CheckboxRoot value='create-user' />
          Create User
        </label>
        <label className='flex items-center gap-2 text-sm'>
          <CheckboxRoot value='edit-user' />
          Edit User
        </label>
        <label className='flex items-center gap-2 text-sm'>
          <CheckboxRoot value='delete-user' />
          Delete User
        </label>
        <label className='flex items-center gap-2 text-sm'>
          <CheckboxRoot value='assign-roles' />
          Assign Roles
        </label>
      </CheckboxGroup>
    </CheckboxGroup>
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
        <>
          <div id='protocols-label' className='text-sm font-semibold'>
            Allowed network protocols
          </div>
          <CheckboxGroup aria-labelledby='protocols-label' defaultValue={['http']}>
            <label className='flex items-center gap-2 text-sm'>
              <CheckboxRoot value='http' />
              HTTP
            </label>
            <label className='flex items-center gap-2 text-sm'>
              <CheckboxRoot value='https' />
              HTTPS
            </label>
            <label className='flex items-center gap-2 text-sm'>
              <CheckboxRoot value='ssh' />
              SSH
            </label>
          </CheckboxGroup>
        </>
      )
    },
    {
      name: 'Rendering as a native button',
      render: () => (
        <>
          <div id='protocols-nb-label' className='text-sm font-semibold'>
            Allowed network protocols
          </div>
          <CheckboxGroup aria-labelledby='protocols-nb-label'>
            <div className='flex items-center gap-2 text-sm'>
              <label htmlFor='protocol-http' className='text-foreground'>
                HTTP
              </label>
              <CheckboxRoot id='protocol-http' value='http' nativeButton render={<button />} />
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <label htmlFor='protocol-https' className='text-foreground'>
                HTTPS
              </label>
              <CheckboxRoot id='protocol-https' value='https' nativeButton render={<button />} />
            </div>
          </CheckboxGroup>
        </>
      )
    },
    {
      name: 'Render callback',
      render: () => (
        <>
          <div id='protocols-cb-label' className='text-sm font-semibold'>
            Allowed network protocols
          </div>
          <CheckboxGroup aria-labelledby='protocols-cb-label'>
            <CheckboxRoot
              value='http'
              nativeButton
              render={(buttonProps) => (
                <label className='flex items-center gap-2 text-sm text-foreground'>
                  <button {...buttonProps} />
                  HTTP
                </label>
              )}
            />
            <CheckboxRoot
              value='https'
              nativeButton
              render={(buttonProps) => (
                <label className='flex items-center gap-2 text-sm text-foreground'>
                  <button {...buttonProps} />
                  HTTPS
                </label>
              )}
            />
          </CheckboxGroup>
        </>
      )
    },
    {
      name: 'Form integration',
      render: () => (
        <Form className='w-64'>
          <FieldRoot name='allowedNetworkProtocols'>
            <FieldsetRoot render={<CheckboxGroup />}>
              <FieldsetLegend>Allowed network protocols</FieldsetLegend>
              <FieldItem>
                <FieldLabel className='flex items-center gap-2'>
                  <CheckboxRoot value='http' />
                  HTTP
                </FieldLabel>
              </FieldItem>
              <FieldItem>
                <FieldLabel className='flex items-center gap-2'>
                  <CheckboxRoot value='https' />
                  HTTPS
                </FieldLabel>
              </FieldItem>
              <FieldItem>
                <FieldLabel className='flex items-center gap-2'>
                  <CheckboxRoot value='ssh' />
                  SSH
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
        <CheckboxGroup aria-label='Disabled group' disabled defaultValue={['http']}>
          <label className='flex items-center gap-2 text-sm'>
            <CheckboxRoot value='http' />
            HTTP
          </label>
          <label className='flex items-center gap-2 text-sm'>
            <CheckboxRoot value='https' />
            HTTPS
          </label>
        </CheckboxGroup>
      )
    }
  ]
}
