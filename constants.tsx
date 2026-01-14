
import React from 'react';

export const PUEBLA_LOGO = "https://lh3.googleusercontent.com/aida-public/AB6AXuCvw1dpxms1r9LTm_L-qsPUUtFeNviPi6PTyNj_bV9y_v7Gm4nGHFfLSLDlU9MZNhM_9zFfZGETlDznG9mUO6Hlv4yAo3SYqfppHh4qe7Dm49GQt9f7Okk4AkhlruNZhB4LVqJRhdPTvPK0wZ-Q6DfxMoDD9cMB2EK5FcPZF_JkUQNExjPNTZdWqOhjHJLY7rHhTUWbmZ0ufxK1sw4AcCvPAomW26Bq6rTCUXGPpMLsUxtFQvszRfkL9p7Z1Y_boFNy0b25ySYZjrRv";

export const MaterialIcon: React.FC<{ name: string; className?: string; fill?: boolean }> = ({ name, className = "", fill = false }) => (
  <span className={`material-symbols-outlined ${className}`} style={{ fontVariationSettings: `'FILL' ${fill ? 1 : 0}` }}>
    {name}
  </span>
);
