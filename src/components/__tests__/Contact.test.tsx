import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from '../Contact'

describe('Contact Component', () => {
  // Mock console.log and window.alert
  const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

  beforeEach(() => {
    // Clear mocks before each test
    consoleSpy.mockClear()
    alertSpy.mockClear()
  })

  afterEach(() => {
    // Cleanup after each test
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders the contact section with correct heading', () => {
      render(<Contact />)

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Get In Touch')
    })

    it('renders contact information section', () => {
      render(<Contact />)

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Contact Information')
      expect(screen.getByText(/Feel free to reach out/i)).toBeInTheDocument()
    })

    it('renders contact details with email and location', () => {
      render(<Contact />)

      expect(screen.getByText('Email:')).toBeInTheDocument()
      expect(screen.getByText('your.email@example.com')).toBeInTheDocument()
      expect(screen.getByText('Location:')).toBeInTheDocument()
      expect(screen.getByText('City, Country')).toBeInTheDocument()
    })

    it('renders social links', () => {
      render(<Contact />)

      const linkedInLink = screen.getByRole('link', { name: /LinkedIn/i })
      const githubLink = screen.getByRole('link', { name: /GitHub/i })
      const twitterLink = screen.getByRole('link', { name: /Twitter/i })

      expect(linkedInLink).toBeInTheDocument()
      expect(linkedInLink).toHaveAttribute('target', '_blank')
      expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer')

      expect(githubLink).toBeInTheDocument()
      expect(githubLink).toHaveAttribute('target', '_blank')

      expect(twitterLink).toBeInTheDocument()
      expect(twitterLink).toHaveAttribute('target', '_blank')
    })

    it('renders the contact form with all required fields', () => {
      render(<Contact />)

      expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument()
    })

    it('renders input fields with correct types and attributes', () => {
      render(<Contact />)

      const nameInput = screen.getByPlaceholderText('Your Name')
      const emailInput = screen.getByPlaceholderText('Your Email')
      const messageInput = screen.getByPlaceholderText('Your Message')

      expect(nameInput).toHaveAttribute('type', 'text')
      expect(nameInput).toHaveAttribute('name', 'name')
      expect(nameInput).toBeRequired()

      expect(emailInput).toHaveAttribute('type', 'email')
      expect(emailInput).toHaveAttribute('name', 'email')
      expect(emailInput).toBeRequired()

      expect(messageInput).toHaveAttribute('name', 'message')
      expect(messageInput).toHaveAttribute('rows', '5')
      expect(messageInput).toBeRequired()
    })
  })

  describe('User Interactions - Happy Paths', () => {
    it('updates name input when user types', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const nameInput = screen.getByPlaceholderText('Your Name')
      await user.type(nameInput, 'John Doe')

      expect(nameInput).toHaveValue('John Doe')
    })

    it('updates email input when user types', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const emailInput = screen.getByPlaceholderText('Your Email')
      await user.type(emailInput, 'john@example.com')

      expect(emailInput).toHaveValue('john@example.com')
    })

    it('updates message textarea when user types', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const messageInput = screen.getByPlaceholderText('Your Message')
      await user.type(messageInput, 'Hello, this is a test message.')

      expect(messageInput).toHaveValue('Hello, this is a test message.')
    })

    it('submits the form with valid data and shows success message', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const nameInput = screen.getByPlaceholderText('Your Name')
      const emailInput = screen.getByPlaceholderText('Your Email')
      const messageInput = screen.getByPlaceholderText('Your Message')
      const submitButton = screen.getByRole('button', { name: /Send Message/i })

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(messageInput, 'Hello, this is a test message.')
      await user.click(submitButton)

      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('Thank you for your message! I will get back to you soon.')
      })

      expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, this is a test message.',
      })
    })

    it('clears form fields after successful submission', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const nameInput = screen.getByPlaceholderText('Your Name')
      const emailInput = screen.getByPlaceholderText('Your Email')
      const messageInput = screen.getByPlaceholderText('Your Message')
      const submitButton = screen.getByRole('button', { name: /Send Message/i })

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(messageInput, 'Hello, this is a test message.')
      await user.click(submitButton)

      await waitFor(() => {
        expect(nameInput).toHaveValue('')
        expect(emailInput).toHaveValue('')
        expect(messageInput).toHaveValue('')
      })
    })

    it('handles special characters in name field', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const nameInput = screen.getByPlaceholderText('Your Name')
      await user.type(nameInput, 'José García-Müller')

      expect(nameInput).toHaveValue('José García-Müller')
    })

    it('handles long messages in textarea', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const messageInput = screen.getByPlaceholderText('Your Message')
      const longMessage = 'A'.repeat(1000)
      await user.type(messageInput, longMessage)

      expect(messageInput).toHaveValue(longMessage)
    })
  })

  describe('Edge Cases', () => {
    it('handles form submission with minimum required data', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const nameInput = screen.getByPlaceholderText('Your Name')
      const emailInput = screen.getByPlaceholderText('Your Email')
      const messageInput = screen.getByPlaceholderText('Your Message')
      const submitButton = screen.getByRole('button', { name: /Send Message/i })

      // Single character inputs
      await user.type(nameInput, 'J')
      await user.type(emailInput, 'a@b.c')
      await user.type(messageInput, 'Hi')
      await user.click(submitButton)

      expect(alertSpy).toHaveBeenCalledWith('Thank you for your message! I will get back to you soon.')
    })

    it('handles rapid form field updates', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const nameInput = screen.getByPlaceholderText('Your Name')

      await user.type(nameInput, 'abc')
      await user.clear(nameInput)
      await user.type(nameInput, 'xyz')

      expect(nameInput).toHaveValue('xyz')
    })

    it('handles email with subdomain', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const emailInput = screen.getByPlaceholderText('Your Email')
      await user.type(emailInput, 'user@mail.example.com')

      expect(emailInput).toHaveValue('user@mail.example.com')
    })

    it('handles email with plus sign', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const emailInput = screen.getByPlaceholderText('Your Email')
      await user.type(emailInput, 'user+tag@example.com')

      expect(emailInput).toHaveValue('user+tag@example.com')
    })

    it('handles multiline text in message field', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const messageInput = screen.getByPlaceholderText('Your Message')
      await user.type(messageInput, 'Line 1\nLine 2\nLine 3')

      expect(messageInput).toHaveValue('Line 1\nLine 2\nLine 3')
    })

    it('handles unicode characters in message', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const messageInput = screen.getByPlaceholderText('Your Message')
      await user.type(messageInput, '🎉 Hello 世界 🌍')

      expect(messageInput).toHaveValue('🎉 Hello 世界 🌍')
    })
  })

  describe('Error Cases and Validation', () => {
    it('prevents form submission when name is empty', async () => {
      render(<Contact />)

      const form = document.querySelector('.contact-form')
      const submitButton = screen.getByRole('button', { name: /Send Message/i })

      // Try to submit with empty name
      const nameInput = screen.getByPlaceholderText('Your Name')
      expect(nameInput).toBeInvalid()

      // Form should not submit due to HTML5 validation
      expect(form).toBeTruthy()
    })

    it('prevents form submission when email is empty', async () => {
      render(<Contact />)

      const emailInput = screen.getByPlaceholderText('Your Email')

      // Email input should be required
      expect(emailInput).toBeRequired()
      expect(emailInput).toBeInvalid()
    })

    it('prevents form submission when message is empty', async () => {
      render(<Contact />)

      const messageInput = screen.getByPlaceholderText('Your Message')

      // Message textarea should be required
      expect(messageInput).toBeRequired()
      expect(messageInput).toBeInvalid()
    })

    it('validates email format with type="email"', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const emailInput = screen.getByPlaceholderText('Your Email')

      // Type invalid email
      await user.type(emailInput, 'invalid-email')
      expect(emailInput).toHaveValue('invalid-email')

      // HTML5 validation should mark it as invalid
      expect(emailInput).toBeInvalid()
    })

    it('accepts valid email format', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const emailInput = screen.getByPlaceholderText('Your Email')

      await user.type(emailInput, 'valid@example.com')
      expect(emailInput).toHaveValue('valid@example.com')
    })

    it('handles form submission with all whitespace inputs', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const nameInput = screen.getByPlaceholderText('Your Name')
      const emailInput = screen.getByPlaceholderText('Your Email')
      const messageInput = screen.getByPlaceholderText('Your Message')

      // Note: The current implementation doesn't trim values
      // This test documents current behavior
      await user.type(nameInput, '   ')
      await user.type(emailInput, 'test@test.com')
      await user.type(messageInput, '   ')

      expect(nameInput).toHaveValue('   ')
      expect(messageInput).toHaveValue('   ')
    })
  })

  describe('Form State Management', () => {
    it('maintains independent state for each field', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const nameInput = screen.getByPlaceholderText('Your Name')
      const emailInput = screen.getByPlaceholderText('Your Email')
      const messageInput = screen.getByPlaceholderText('Your Message')

      await user.type(nameInput, 'John')
      expect(nameInput).toHaveValue('John')
      expect(emailInput).toHaveValue('')
      expect(messageInput).toHaveValue('')

      await user.type(emailInput, 'john@example.com')
      expect(nameInput).toHaveValue('John')
      expect(emailInput).toHaveValue('john@example.com')
      expect(messageInput).toHaveValue('')
    })

    it('updates only the targeted field on input change', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const nameInput = screen.getByPlaceholderText('Your Name')
      const emailInput = screen.getByPlaceholderText('Your Email')

      await user.type(nameInput, 'John')
      const emailValueBefore = emailInput.getAttribute('value')

      await user.type(emailInput, 'john@example.com')

      expect(nameInput).toHaveValue('John')
      expect(emailInput).toHaveValue('john@example.com')
    })

    it('handles pasting content into fields', async () => {
      const user = userEvent.setup()
      render(<Contact />)

      const messageInput = screen.getByPlaceholderText('Your Message')

      // Simulate paste operation
      await user.clear(messageInput)
      await user.paste('Pasted content')

      expect(messageInput).toHaveValue('Pasted content')
    })
  })

  describe('Accessibility', () => {
    it('has proper form structure with form element', () => {
      render(<Contact />)

      const form = document.querySelector('form.contact-form')
      expect(form).toBeInTheDocument()
    })

    it('has required attributes on required fields', () => {
      render(<Contact />)

      const inputs = screen.getAllByRole('textbox')
      inputs.forEach(input => {
        expect(input).toBeRequired()
      })
    })

    it('has proper link attributes for security', () => {
      render(<Contact />)

      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })

    it('uses semantic HTML elements', () => {
      render(<Contact />)

      expect(document.querySelector('section')).toBeInTheDocument()
      expect(document.querySelector('form')).toBeInTheDocument()
      expect(document.querySelectorAll('input, textarea').length).toBeGreaterThan(0)
    })
  })
})
