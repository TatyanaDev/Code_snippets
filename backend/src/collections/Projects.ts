import type { CollectionConfig } from 'payload'
import takeScreenshot from '@/utils/takeScreenshot'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'technologies',
      type: 'relationship',
      required: true,
      relationTo: 'technologies',
      hasMany: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Fullstack', value: 'fullstack' },
      ],
    },
    {
      name: 'isAdaptive',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'deployUrl',
      type: 'text',
      required: true,
    },
    {
      name: 'codeUrl',
      type: 'text',
      required: true,
    },
    {
      name: 'previewImage',
      type: 'upload',
      required: false,
      relationTo: 'screenshots',
      admin: {
        readOnly: true,
        condition: ({ previewImage }) => !!previewImage,
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          if (doc.deployUrl && !doc.previewImage) {
            try {
              const formattedTitle = doc.title.toLowerCase().replace(/\s+/g, '_')
              const fileName = `${formattedTitle}_${Date.now()}.png`
              const screenshotBuffer = await takeScreenshot(doc.deployUrl)

              const screenshotDoc = await req.payload.create({
                collection: 'screenshots',
                data: {
                  alt: `Screenshot of ${doc.deployUrl}`,
                },
                file: {
                  data: screenshotBuffer,
                  mimetype: 'image/png',
                  name: fileName,
                  size: screenshotBuffer.length,
                },
              })

              doc.previewImage = screenshotDoc.id
            } catch (error) {
              console.error('Error while creating a screenshot:', error)
            }
          }
        }
      },
    ],
    afterDelete: [
      async ({ id, req }) => {
        try {
          const project = await req.payload.findByID({
            collection: 'projects',
            id,
          })

          if (project && project.previewImage) {
            const screenshotId = (project.previewImage as { id: string }).id

            await req.payload.delete({
              collection: 'screenshots',
              id: screenshotId,
            })
          }
        } catch (error) {
          console.error('Error while deleting a project and a screenshot:', error)
        }
      },
    ],
  },
}
