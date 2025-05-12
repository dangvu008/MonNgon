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
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          dietary_restrictions: string[] | null
          cuisine_preferences: string[] | null
          allergies: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          dietary_restrictions?: string[] | null
          cuisine_preferences?: string[] | null
          allergies?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          dietary_restrictions?: string[] | null
          cuisine_preferences?: string[] | null
          allergies?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      recipes: {
        Row: {
          id: string
          user_id: string | null
          title: string
          description: string | null
          instructions: string[]
          prep_time: number
          cook_time: number
          servings: number
          difficulty: 'easy' | 'medium' | 'hard'
          cuisine: string | null
          calories: number | null
          protein: number | null
          carbs: number | null
          fat: number | null
          image_url: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          title: string
          description?: string | null
          instructions: string[]
          prep_time: number
          cook_time: number
          servings: number
          difficulty?: 'easy' | 'medium' | 'hard'
          cuisine?: string | null
          calories?: number | null
          protein?: number | null
          carbs?: number | null
          fat?: number | null
          image_url?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          title?: string
          description?: string | null
          instructions?: string[]
          prep_time?: number
          cook_time?: number
          servings?: number
          difficulty?: 'easy' | 'medium' | 'hard'
          cuisine?: string | null
          calories?: number | null
          protein?: number | null
          carbs?: number | null
          fat?: number | null
          image_url?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      recipe_ingredients: {
        Row: {
          id: string
          recipe_id: string
          name: string
          amount: number
          unit: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          recipe_id: string
          name: string
          amount: number
          unit: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          recipe_id?: string
          name?: string
          amount?: number
          unit?: string
          notes?: string | null
          created_at?: string
        }
      }
      recipe_tags: {
        Row: {
          id: string
          recipe_id: string
          tag: string
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          recipe_id: string
          tag: string
          category: string
          created_at?: string
        }
        Update: {
          id?: string
          recipe_id?: string
          tag?: string
          category?: string
          created_at?: string
        }
      }
    }
  }
}