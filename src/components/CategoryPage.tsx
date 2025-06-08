import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import type { FormField } from '../types'
import { categoryForms } from '../data/formFields'

const CategoryContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.colors.primary};
`

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: none;
  border: 2px solid ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.text};
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.text};
    color: ${props => props.theme.colors.primary};
  }
`

const CategoryTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
  margin: 4rem 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${props => props.theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 3rem 0 1rem 0;
  }
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 3rem;
  text-align: center;
  max-width: 600px;
`

const OptionalText = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: normal;
  margin-left: 0.5rem;
`

const FormContainer = styled.form`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 15px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  border: 2px solid ${props => props.theme.colors.accent};
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 8px;
  background-color: #ffffff;
  color: #333333;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.text};
  }
  
  &::placeholder {
    color: #666666;
  }
`

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 8px;
  background-color: #ffffff;
  color: #333333;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.text};
  }
  
  option {
    background-color: #ffffff;
    color: #333333;
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.primary};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background-color: ${props => props.theme.colors.textSecondary};
  }
`

interface FormData {
  [key: string]: string | number
}

const CategoryPage = () => {
  const { sport, category } = useParams<{ sport: string; category: string }>()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({})
  
  // Type-safe access to categoryForms
  const getFormFields = (): FormField[] => {
    if (!sport || !category) return []
    const sportForms = (categoryForms as any)[sport]
    if (!sportForms) return []
    return sportForms[category] || []
  }
  
  const formFields: FormField[] = getFormFields()

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Navigate to recommendations page with form data
    navigate('/recommendations', { 
      state: { 
        sport, 
        category, 
        formData 
      }
    })
  }

  const handleBackClick = () => {
    navigate(`/sport/${sport}`)
  }

  return (
    <CategoryContainer>
      <BackButton onClick={handleBackClick}>
        ← Back to {sport}
      </BackButton>
        <CategoryTitle>{category}</CategoryTitle>
      <Subtitle>
        Share what you know to get better recommendations - all fields are optional
      </Subtitle>
      
      <FormContainer onSubmit={handleSubmit}>        {formFields.map((field: FormField) => (
          <FormGroup key={field.name}>
            <Label htmlFor={field.name}>
              {field.label}
              <OptionalText>(optional)</OptionalText>
            </Label>
            {field.type === 'select' ? (
              <Select
                id={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            ) : (
              <Input
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
            )}
          </FormGroup>
        ))}
        
        <SubmitButton type="submit">
          Get Recommendations
        </SubmitButton>
      </FormContainer>
    </CategoryContainer>
  )
}

export default CategoryPage
