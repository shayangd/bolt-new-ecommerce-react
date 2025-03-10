export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          price: number
          description: string
          image: string
          category: string
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          price: number
          description: string
          image: string
          category: string
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          price?: number
          description?: string
          image?: string
          category?: string
          created_at?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: string
          total: number
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          status?: string
          total?: number
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          status?: string
          total?: number
          created_at?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at: string | null
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at?: string | null
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
          created_at?: string | null
        }
      }
      cart_items: {
        Row: {
          id: string
          cart_id: string
          product_id: string
          quantity: number
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          cart_id: string
          product_id: string
          quantity: number
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          cart_id?: string
          product_id?: string
          quantity?: number
          created_at?: string | null
          updated_at?: string | null
        }
      }
      carts: {
        Row: {
          id: string
          user_id: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}