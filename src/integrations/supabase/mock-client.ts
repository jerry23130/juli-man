// Mock Supabase client for testing when Supabase is not available
export const supabase = {
  auth: {
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      // Mock admin login
      if (email === 'eyerustekto@gmail.com' && password === 'eyerus1996') {
        return {
          data: {
            user: {
              id: 'mock-admin-id',
              email: 'eyerustekto@gmail.com'
            }
          },
          error: null
        };
      }
      
      return {
        data: null,
        error: { message: 'Invalid login credentials' }
      };
    },
    
    signOut: async () => {
      return { error: null };
    },
    
    getSession: async () => {
      // Check if user is "logged in" via localStorage
      const mockUser = localStorage.getItem('mockAdminUser');
      if (mockUser) {
        return {
          data: {
            session: {
              user: JSON.parse(mockUser)
            }
          }
        };
      }
      return { data: { session: null } };
    }
  },
  
  from: (table: string) => ({
    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        eq: (column2: string, value2: any) => {
          // Mock user_roles check for admin
          if (table === 'user_roles' && column === 'user_id' && column2 === 'role') {
            return Promise.resolve({
              data: [{ role: 'admin' }], // Always return admin for mock user
              error: null
            });
          }
          
          // Mock bookings data
          if (table === 'bookings') {
            return Promise.resolve({
              data: [
                {
                  id: '1',
                  full_name: 'John Doe',
                  phone: '+1234567890',
                  email: 'john@example.com',
                  service_type: 'Photography',
                  event_date: '2024-06-15',
                  location: 'New York',
                  message: 'Need wedding photography',
                  status: 'pending',
                  created_at: new Date().toISOString()
                },
                {
                  id: '2',
                  full_name: 'Jane Smith',
                  phone: '+0987654321',
                  email: 'jane@example.com',
                  service_type: 'Videography',
                  event_date: '2024-07-20',
                  location: 'Los Angeles',
                  message: 'Corporate event coverage',
                  status: 'confirmed',
                  created_at: new Date().toISOString()
                }
              ],
              error: null
            });
          }
          
          return Promise.resolve({ data: [], error: null });
        }
      }),
      
      order: (column: string, options?: any) => ({
        then: (callback: any) => {
          // Return mock bookings
          callback({
            data: [
              {
                id: '1',
                full_name: 'John Doe',
                phone: '+1234567890',
                email: 'john@example.com',
                service_type: 'Photography',
                event_date: '2024-06-15',
                location: 'New York',
                message: 'Need wedding photography',
                status: 'pending',
                created_at: new Date().toISOString()
              },
              {
                id: '2',
                full_name: 'Jane Smith',
                phone: '+0987654321',
                email: 'jane@example.com',
                service_type: 'Videography',
                event_date: '2024-07-20',
                location: 'Los Angeles',
                message: 'Corporate event coverage',
                status: 'confirmed',
                created_at: new Date().toISOString()
              }
            ],
            error: null
          });
        }
      })
    }),
    
    update: (data: any) => ({
      eq: (column: string, value: any) => {
        return Promise.resolve({ error: null });
      }
    })
  })
};
