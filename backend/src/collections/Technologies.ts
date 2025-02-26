import type { CollectionConfig } from 'payload'

export const Technologies: CollectionConfig = {
  slug: 'technologies',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        try {
          const projects = await req.payload.find({
            collection: 'projects',
            where: {
              technologies: {
                in: [doc.id],
              },
            },
          })

          await Promise.all(
            projects.docs.map((project) =>
              req.payload.update({
                collection: 'projects',
                id: project.id,
                data: {
                  technologies: project.technologies.map((technology) =>
                    technology === doc.id ? doc : technology,
                  ),
                },
              }),
            ),
          )
        } catch (error) {
          console.error('Error while updating projects with new technology:', error)
        }
      },
    ],
  },
}
