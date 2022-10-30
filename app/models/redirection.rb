# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :frompath, uniqueness: true
  validate :check_both_input_is_not_same
  validate :check_cyclic_redirection_does_not_exist

  private

    def check_both_input_is_not_same
      errors.add(:base, "redirection.same_value") if frompath == topath
    end

    def check_cyclic_redirection_does_not_exist
      next_path = topath
      while (r = Redirection.find_by(frompath: next_path))
        if r.topath === frompath
          errors.add(:base, "Cyclic redirection detected")
          break
        end
        next_path = r.topath
      end
    end
end
